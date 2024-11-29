from flask import Flask, send_file, Response, jsonify
from flask_cors import CORS
from service import GetTable, GetArchive
from datetime import datetime

from service import DatabaseHandler
from db_config import DBConfig

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})

@app.route('/download/<table_name>')
def download_excel(table_name):
    try:
        excel_stream = GetTable(table_name)  
        if excel_stream:
            return send_file(
                excel_stream,
                as_attachment=True,
                download_name=f"{table_name}.xlsx",
                mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            )
        else:
            return jsonify({"error": f"No data available for table {table_name}."}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500;

@app.route('/archive')
def addArchive():
    try:
        archive_stream = GetArchive()  
        if archive_stream:
            archive_name = datetime.now().strftime("%Y-%m-%d_%H-%M-%S") + ".zip"
            
            response = Response(archive_stream, mimetype='application/zip')
            response.headers['Content-Disposition'] = f'attachment; filename={archive_name}'
            response.headers['Archive-Name'] = archive_name

            return response
        else:
            return jsonify({"error": "No data available for table."}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
