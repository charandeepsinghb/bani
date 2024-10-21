def format_text_to_html(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    current_num = None
    html_output = []
    paragraph_open = False

    for line in lines:
        # Split the line into number and content
        parts = line.strip().split('\t')
        if len(parts) != 2:
            continue

        num, text = parts
        # If the number changes, close the current paragraph (if open) and start a new one
        if num != current_num:
            if paragraph_open:
                html_output.append('</p>')
            html_output.append(f'<p>')
            current_num = num
            paragraph_open = True

        # Add the text wrapped in a span tag
        html_output.append(f'<span>{text}</span>')

    # Close the last paragraph
    if paragraph_open:
        html_output.append('</p>')

    # Write to output HTML file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(html_output))

# Usage
input_file = 'sukhmani-sahib-edit.txt'   # Replace with your input file name
output_file = 'output.html'  # Replace with your output file name
format_text_to_html(input_file, output_file)
