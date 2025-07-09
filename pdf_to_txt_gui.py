import os
import sys
import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import threading
import PyPDF2
import pdfplumber
from pathlib import Path

class PDFToTxtGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("PDF to TXT 변환기")
        self.root.geometry("600x500")
        self.root.resizable(True, True)
        
        # 변수 초기화
        self.pdf_files = []
        self.output_folder = ""
        self.method = tk.StringVar(value="pdfplumber")
        
        self.create_widgets()
        
    def create_widgets(self):
        # 메인 프레임
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # 제목
        title_label = ttk.Label(main_frame, text="PDF to TXT 변환기", font=("Arial", 16, "bold"))
        title_label.grid(row=0, column=0, columnspan=3, pady=(0, 20))
        
        # PDF 파일 선택 섹션
        pdf_frame = ttk.LabelFrame(main_frame, text="PDF 파일 선택", padding="10")
        pdf_frame.grid(row=1, column=0, columnspan=3, sticky=(tk.W, tk.E), pady=(0, 10))
        
        # 단일 파일 선택
        ttk.Button(pdf_frame, text="PDF 파일 선택", command=self.select_single_file).grid(row=0, column=0, padx=(0, 10))
        ttk.Button(pdf_frame, text="여러 PDF 파일 선택", command=self.select_multiple_files).grid(row=0, column=1, padx=(0, 10))
        ttk.Button(pdf_frame, text="폴더 선택", command=self.select_folder).grid(row=0, column=2)
        
        # 선택된 파일 목록
        self.file_listbox = tk.Listbox(pdf_frame, height=6)
        self.file_listbox.grid(row=1, column=0, columnspan=3, sticky=(tk.W, tk.E), pady=(10, 0))
        
        # 스크롤바
        scrollbar = ttk.Scrollbar(pdf_frame, orient=tk.VERTICAL, command=self.file_listbox.yview)
        scrollbar.grid(row=1, column=3, sticky=(tk.N, tk.S), pady=(10, 0))
        self.file_listbox.config(yscrollcommand=scrollbar.set)
        
        # 파일 목록 삭제 버튼
        ttk.Button(pdf_frame, text="선택 해제", command=self.clear_files).grid(row=2, column=0, pady=(5, 0))
        
        # 출력 폴더 선택 섹션
        output_frame = ttk.LabelFrame(main_frame, text="출력 설정", padding="10")
        output_frame.grid(row=2, column=0, columnspan=3, sticky=(tk.W, tk.E), pady=(0, 10))
        
        ttk.Label(output_frame, text="저장 폴더:").grid(row=0, column=0, sticky=tk.W)
        self.output_label = ttk.Label(output_frame, text="선택되지 않음 (PDF와 같은 폴더에 저장)", foreground="gray")
        self.output_label.grid(row=0, column=1, sticky=(tk.W, tk.E), padx=(10, 0))
        
        ttk.Button(output_frame, text="폴더 선택", command=self.select_output_folder).grid(row=1, column=0, pady=(5, 0))
        ttk.Button(output_frame, text="기본값으로 설정", command=self.reset_output_folder).grid(row=1, column=1, sticky=tk.W, padx=(10, 0))
        
        # 추출 방법 선택
        method_frame = ttk.LabelFrame(main_frame, text="추출 방법", padding="10")
        method_frame.grid(row=3, column=0, columnspan=3, sticky=(tk.W, tk.E), pady=(0, 10))
        
        ttk.Radiobutton(method_frame, text="pdfplumber (권장 - 더 정확)", 
                       variable=self.method, value="pdfplumber").grid(row=0, column=0, sticky=tk.W)
        ttk.Radiobutton(method_frame, text="PyPDF2 (빠름)", 
                       variable=self.method, value="pypdf2").grid(row=1, column=0, sticky=tk.W)
        
        # 변환 버튼
        button_frame = ttk.Frame(main_frame)
        button_frame.grid(row=4, column=0, columnspan=3, pady=(10, 0))
        
        self.convert_button = ttk.Button(button_frame, text="변환 시작", command=self.start_conversion)
        self.convert_button.grid(row=0, column=0, padx=(0, 10))
        
        ttk.Button(button_frame, text="종료", command=self.root.quit).grid(row=0, column=1)
        
        # 진행 상황 표시
        self.progress = ttk.Progressbar(main_frame, mode='determinate')
        self.progress.grid(row=5, column=0, columnspan=3, sticky=(tk.W, tk.E), pady=(10, 0))
        
        # 상태 표시
        self.status_label = ttk.Label(main_frame, text="파일을 선택하고 변환 시작 버튼을 클릭하세요.")
        self.status_label.grid(row=6, column=0, columnspan=3, pady=(10, 0))
        
        # 그리드 가중치 설정
        main_frame.columnconfigure(1, weight=1)
        pdf_frame.columnconfigure(2, weight=1)
        output_frame.columnconfigure(1, weight=1)
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        
    def select_single_file(self):
        """단일 PDF 파일 선택"""
        file_path = filedialog.askopenfilename(
            title="PDF 파일 선택",
            filetypes=[("PDF files", "*.pdf"), ("All files", "*.*")]
        )
        if file_path:
            self.pdf_files = [file_path]
            self.update_file_list()
    
    def select_multiple_files(self):
        """여러 PDF 파일 선택"""
        file_paths = filedialog.askopenfilenames(
            title="PDF 파일들 선택",
            filetypes=[("PDF files", "*.pdf"), ("All files", "*.*")]
        )
        if file_paths:
            self.pdf_files = list(file_paths)
            self.update_file_list()
    
    def select_folder(self):
        """폴더 내 모든 PDF 파일 선택"""
        folder_path = filedialog.askdirectory(title="PDF 파일이 있는 폴더 선택")
        if folder_path:
            pdf_files = []
            for file in os.listdir(folder_path):
                if file.lower().endswith('.pdf'):
                    pdf_files.append(os.path.join(folder_path, file))
            
            if pdf_files:
                self.pdf_files = pdf_files
                self.update_file_list()
            else:
                messagebox.showwarning("경고", "선택한 폴더에 PDF 파일이 없습니다.")
    
    def update_file_list(self):
        """파일 목록 업데이트"""
        self.file_listbox.delete(0, tk.END)
        for file_path in self.pdf_files:
            self.file_listbox.insert(tk.END, os.path.basename(file_path))
        
        self.status_label.config(text=f"{len(self.pdf_files)}개의 PDF 파일이 선택되었습니다.")
    
    def clear_files(self):
        """선택된 파일 목록 지우기"""
        self.pdf_files = []
        self.file_listbox.delete(0, tk.END)
        self.status_label.config(text="파일을 선택하고 변환 시작 버튼을 클릭하세요.")
    
    def select_output_folder(self):
        """출력 폴더 선택"""
        folder_path = filedialog.askdirectory(title="TXT 파일을 저장할 폴더 선택")
        if folder_path:
            self.output_folder = folder_path
            self.output_label.config(text=folder_path, foreground="black")
    
    def reset_output_folder(self):
        """출력 폴더를 기본값으로 리셋"""
        self.output_folder = ""
        self.output_label.config(text="선택되지 않음 (PDF와 같은 폴더에 저장)", foreground="gray")
    
    def start_conversion(self):
        """변환 시작"""
        if not self.pdf_files:
            messagebox.showwarning("경고", "변환할 PDF 파일을 선택해주세요.")
            return
        
        # 변환 중 버튼 비활성화
        self.convert_button.config(state='disabled')
        
        # 별도 스레드에서 변환 실행
        threading.Thread(target=self.convert_files, daemon=True).start()
    
    def convert_files(self):
        """파일 변환 실행"""
        total_files = len(self.pdf_files)
        self.progress.config(maximum=total_files)
        success_count = 0
        
        for i, pdf_path in enumerate(self.pdf_files):
            # 상태 업데이트
            filename = os.path.basename(pdf_path)
            self.root.after(0, lambda f=filename: self.status_label.config(text=f"변환 중: {f}"))
            
            # 출력 파일 경로 결정
            if self.output_folder:
                output_path = os.path.join(self.output_folder, Path(pdf_path).stem + ".txt")
            else:
                output_path = os.path.join(os.path.dirname(pdf_path), Path(pdf_path).stem + ".txt")
            
            # 변환 실행
            if self.convert_single_file(pdf_path, output_path):
                success_count += 1
            
            # 진행률 업데이트
            self.root.after(0, lambda v=i+1: self.progress.config(value=v))
        
        # 완료 메시지
        self.root.after(0, lambda: self.conversion_complete(success_count, total_files))
    
    def convert_single_file(self, pdf_path, output_path):
        """단일 파일 변환"""
        try:
            method = self.method.get()
            
            if method == "pdfplumber":
                extracted_text = self.extract_text_with_pdfplumber(pdf_path)
            else:
                extracted_text = self.extract_text_with_pypdf2(pdf_path)
            
            if extracted_text is None:
                return False
            
            with open(output_path, 'w', encoding='utf-8') as txt_file:
                txt_file.write(extracted_text)
            
            return True
        except Exception as e:
            print(f"변환 오류: {e}")
            return False
    
    def extract_text_with_pypdf2(self, pdf_path):
        """PyPDF2를 사용하여 PDF에서 텍스트 추출"""
        text = ""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page_num in range(len(pdf_reader.pages)):
                    page = pdf_reader.pages[page_num]
                    text += page.extract_text() + "\n"
        except Exception as e:
            print(f"PyPDF2로 텍스트 추출 중 오류 발생: {e}")
            return None
        return text

    def extract_text_with_pdfplumber(self, pdf_path):
        """pdfplumber를 사용하여 PDF에서 텍스트 추출"""
        text = ""
        try:
            with pdfplumber.open(pdf_path) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        except Exception as e:
            print(f"pdfplumber로 텍스트 추출 중 오류 발생: {e}")
            return None
        return text
    
    def conversion_complete(self, success_count, total_files):
        """변환 완료 처리"""
        self.convert_button.config(state='normal')
        self.progress.config(value=0)
        
        if success_count == total_files:
            self.status_label.config(text=f"모든 변환 완료! ({success_count}/{total_files})")
            messagebox.showinfo("완료", f"모든 파일 변환이 완료되었습니다!\n성공: {success_count}/{total_files}")
        else:
            self.status_label.config(text=f"변환 완료: {success_count}/{total_files} (일부 실패)")
            messagebox.showwarning("완료", f"변환이 완료되었습니다.\n성공: {success_count}/{total_files}\n실패한 파일이 있습니다.")

def main():
    root = tk.Tk()
    app = PDFToTxtGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()
