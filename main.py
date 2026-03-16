import tkinter as tk


def main() -> None:
    root = tk.Tk()
    root.title("EXE 打包示例")
    root.geometry("320x120")

    label = tk.Label(root, text="打包成功后即可双击运行 .exe", font=("Arial", 12))
    label.pack(expand=True)

    root.mainloop()


if __name__ == "__main__":
    main()
