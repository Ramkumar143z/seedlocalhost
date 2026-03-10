import re

file_path = r'd:\MSEED 4 portals\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

def repl(m):
    return f'<div class="partner-logo-item"><img src="{m.group(1)}" alt="{m.group(2)}"></div>'

pattern = r'<div class="partner-logo-item(?:[^>]*)">\s*<img\s+src="([^"]+)"\s*(?:(?:(?!alt=").)*?)\s*alt="([^"]+)"\s*>\s*</div>'

new_text, count = re.subn(pattern, repl, text, flags=re.DOTALL)

if count > 0:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print(f'Successfully replaced {count} items.')
else:
    print('No items matched the pattern.')
