from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from geopy.distance import geodesic

app = Flask(__name__)
CORS(app)  


with open('facilities.json') as f:
    facilities = json.load(f)

@app.route('/')
def home():
    return jsonify({"message": "MedApp Backend Running 🚀"})

#jkhu
@app.route('/facilities', methods=['GET'])
def get_facilities():
    user_lat = float(request.args.get('lat', 6.5244))
    user_lng = float(request.args.get('lng', 3.3792))
    radius = float(request.args.get('radius', 10))
    specialization = request.args.get('specialization')
    facility_type = request.args.get('type')

    results = []
    for f in facilities:
        distance = geodesic((user_lat, user_lng), (f['lat'], f['lng'])).km
        if distance <= radius:
            if specialization and specialization.lower() not in [s.lower() for s in f["specialization"]]:
                continue
            if facility_type and facility_type.lower() != f["type"].lower():
                continue
            f_copy = f.copy()
            f_copy["distance_km"] = round(distance, 2)
            results.append(f_copy)

    return jsonify(results)


@app.route('/facilities/<int:facility_id>', methods=['GET'])
def get_facility(facility_id):
    for f in facilities:
        if f["id"] == facility_id:
            return jsonify(f)
    return jsonify({"error": "Facility not found"}), 404


@app.route('/emergency', methods=['GET'])
def emergency():
    user_lat = float(request.args.get('lat', 6.5244))
    user_lng = float(request.args.get('lng', 3.3792))
    nearest = min(facilities, key=lambda f: geodesic((user_lat, user_lng), (f['lat'], f['lng'])).km)
    return jsonify({
        "nearest_facility": nearest,
        "emergency_contact": nearest["contact"]
    })

if __name__ == '__main__':
    app.run(debug=True)
