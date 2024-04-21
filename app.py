from flask import Flask, render_template, request, jsonify
from openai import OpenAI
import os

app = Flask(__name__)

# Initialize your keys
MY_OPENAI_KEY = 'sk-proj-c7FRpLh7oHbl6P5yCK2cT3BlbkFJA7av83RlbA4qGHnprJGw'

def get_completion_from_messages(messages, model="gpt-3.5-turbo"):
    client = OpenAI(
        api_key=MY_OPENAI_KEY,
    )

    chat_completion = client.chat.completions.create(
        messages=messages,
        model=model,
    )
    return chat_completion.choices[0].message.content

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.form['user_input']
    context = [{'role': 'user', 'content': user_input}]

    response = get_completion_from_messages(context)

    context.append({'role': 'assistant', 'content': response})

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
