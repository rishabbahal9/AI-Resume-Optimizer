from flask import Flask, render_template, request
from openai import OpenAI
from flask_cors import CORS, cross_origin
import json

client = OpenAI()

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.get("/working")
def get_working():
    return {"working": True}


@app.post("/optimize-resume")
def optimize_resume():
    request_data = request.get_json()
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": "You are a professional resume writer. You have been given a job description and a resume. You need to optimize the resume for the job description."},
            {"role": "user", "content": """
            Job Description:
            """ + request_data['jobDescription']},
            {"role": "user", "content": """My Resume:""" +
                request_data['currentResume']},
            {"role": "user", "content": """Please update my resume to match the job description. 
             Update necessary parts only. Do not change the overall tone of the resume. 
             Make sure Resume passes ATS. Return the response in json format.
             Example response json format:
             {"optimizedResume": "Updated Resume text in string format..."}
             """},
            {"role": "user", "content": request_data['customInstructions']},
        ]
    )
    return {"answer": json.loads(completion.choices[0].message.content)}


if __name__ == "__main__":
    app.run(host='localhost', debug=True)
