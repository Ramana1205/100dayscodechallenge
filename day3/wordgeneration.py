import random 
 
def generate_word(word_list, chain_length=2): 
    # Create a dictionary to store Markov chain transitions 
    chain = {} 
    for i in range(len(word_list) - chain_length): 
        key = tuple(word_list[i:i+chain_length]) 
        value = word_list[i+chain_length] 
        if key in chain: 
            chain[key].append(value) 
        else: 
            chain[key] = [value] 
     
    # Choose a random starting point 
    current_key = random.choice(list(chain.keys())) 
    generated_word = list(current_key) 
     
    # Generate a new word based on the Markov chain 
    while True: 
        if current_key not in chain: 
            break 
        next_word = random.choice(chain[current_key]) 
        generated_word.append(next_word) 
        current_key = tuple(generated_word[-chain_length:]) 
     
    return ' '.join(generated_word) 
 
# Example usage: 
if __name__ == "__main__": 
    text = input("Enter the text to generate words from: ") 
    words = text.split() 
    i=1 
    while(i<5): 
        generated_word = generate_word(words) 
        print("\nGenerated Word:", generated_word) 
        i=i+1;