from socket import IP_DEFAULT_MULTICAST_LOOP
import threading
import flask 
import DBInteraction
import threading


app = flask.Flask(__name__)


def preprocerssor(str):
    return str.lower()

def preprocess_thread(id):
    print(preprocerssor(DBInteraction.getReviewById(id)))

@app.route('/')
def index():
    id = flask.request.args.get("id")
    asyncPreprocess = threading.Thread(target=preprocess_thread, args=(id,))
    asyncPreprocess.start()
    return "Preprocessing"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)