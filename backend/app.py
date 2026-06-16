from flask import Flask
from flask_cors import CORS
from models import db
from routes.auth import auth_bp
from routes.tickets import tickets_bp

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
app.register_blueprint(auth_bp)
app.register_blueprint(tickets_bp)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return {"message": "TicketHub Backend Running"}

if __name__ == "__main__":
    app.run(debug=True)