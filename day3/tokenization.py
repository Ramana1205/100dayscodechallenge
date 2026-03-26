# Take user input for text
text = input("Enter the text to tokenize: ")

# Define punctuation marks
punctuation_marks = ['.', ',', ';', ':', '!', '?', '-', '"', "'", '(', ')', '[', ']', '{', '}']

# Tokenize the text
tokens = []
current_token = ''

for char in text:
    if char not in punctuation_marks and char != ' ':
        current_token += char
    elif current_token:
        tokens.append(current_token)
        current_token = ''

# Add last token if exists
if current_token:
    tokens.append(current_token)

# Print the tokens
print("Original Text:", text)
print("Tokens:", tokens)