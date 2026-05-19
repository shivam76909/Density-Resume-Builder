import re

with open('js/live-preview.js', 'r', encoding='utf-8') as f:
    content = f.read()

def repl(m):
    # Only replace 4.8px with 5.5px inside modern-phone, modern-email, etc.
    text = m.group(0)
    text = re.sub(r'id="modern-(phone|email|location|linkedin|github|portfolio)-text".*?font-size:\s*4\.8px;', lambda x: x.group(0).replace('4.8px', '5.5px'), text, flags=re.DOTALL)
    return text

content = re.sub(r'function getModernHtml\(\) \{.*?(?=function \w+Html)', repl, content, flags=re.DOTALL)

with open('js/live-preview.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated contact text font size!')
