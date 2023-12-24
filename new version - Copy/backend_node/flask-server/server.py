from flask import Flask
from flask_cors import CORS  # Import CORS from Flask-CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for your Flask app

# Members API route
@app.route("/members")
def members():
    return {"members": ["member1", "member2", "member3"]}

    

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
