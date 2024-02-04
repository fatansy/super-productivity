import os

def generate_directory_tree(start_path, indent=""):
    print(f"{indent}📁 {os.path.basename(start_path)}")

    # 获取当前目录下的文件和子目录
    items = sorted(os.listdir(start_path))

    # 忽略的文件和文件夹
    ignored_items = [".vscode", "node_modules", ".angular", ".github", "dist", "build", "docs", "public", "coverage", ".DS_Store", ".git"]

    # 遍历当前目录下的文件和子目录
    for item in items:
        item_path = os.path.join(start_path, item)

        # 如果是目录，递归调用 generate_directory_tree
        if os.path.isdir(item_path) and item not in ignored_items:
            generate_directory_tree(item_path, indent + "  ")
        #elif item not in ignored_items:
        #    print(f"{indent}  📄 {item}")

if __name__ == "__main__":
    current_directory = os.getcwd()
    generate_directory_tree(current_directory)
