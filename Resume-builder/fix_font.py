import re
with open('js/live-preview.js', 'r', encoding='utf-8') as f:
    content = f.read()

def repl_modern_html(m):
    text = m.group(0).replace("'Outfit'", "'Open Sans'")
    # Move Contact title down
    text = text.replace('top: 19.5%; left: 6%; width: 23%;', 'top: 21.5%; left: 6%; width: 23%;')
    # Move Contact list down
    text = text.replace('top: 22.5%; left: 6%; width: 23%;', 'top: 24.5%; left: 6%; width: 23%;')
    return text

content = re.sub(r'function getModernHtml\(\) \{.*?(?=function \w+Html)', repl_modern_html, content, flags=re.DOTALL)

def repl_modern_render(m):
    return m.group(0).replace("'Outfit'", "'Open Sans'")

content = re.sub(r'if \(layoutType === \'modern\'\).*?(?=if \(layoutType === \'peach\')', repl_modern_render, content, flags=re.DOTALL)

with open('js/live-preview.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated font and moved contact down!')
