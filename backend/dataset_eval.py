import pandas as pd
import hashlib
import json
import time
import os
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

def hash_file(file_path):
    with open(file_path, "rb") as f:
        file_hash = hashlib.sha256(f.read()).hexdigest()
    return file_hash

def hash_model(model):
    model_str = str(model.get_params())
    return hashlib.sha256(model_str.encode()).hexdigest()

def train_and_prove(dataset_path):
    df = pd.read_csv(dataset_path, encoding="utf-8-sig")
    print(f"\nLoaded dataset with shape {df.shape}")

    # Automatically detect target column (last column)
    target_col = df.columns[-1]
    print(f"Detected target column: {target_col}")

    X = df.iloc[:, :-1]
    y = df.iloc[:, -1]

    print("Unique labels in target column:", y.unique())

    # Ensure there are at least two unique classes
    if len(y.unique()) < 2:
        print("Only one class found in target column. Skipping training.")
        result = {
            "dataset_hash": hash_file(dataset_path),
            "model_hash": None,
            "accuracy": None,
            "training_time": None,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "note": "Skipped training due to single class in target column."
        }
    else:
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

        model = LogisticRegression(max_iter=200)
        start_time = time.time()
        model.fit(X_train, y_train)
        training_time = round(time.time() - start_time, 3)

        y_pred = model.predict(X_test)
        accuracy = round(accuracy_score(y_test, y_pred), 3)

        dataset_hash = hash_file(dataset_path)
        model_hash = hash_model(model)

        result = {
            "dataset_hash": dataset_hash,
            "model_hash": model_hash,
            "accuracy": accuracy,
            "training_time": training_time,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }

        print("\n Model trained successfully!")
        print(json.dumps(result, indent=4))

    # Save output metadata
    output_path = os.path.join(os.path.dirname(__file__), "output_metadata.json")
    with open(output_path, "a", encoding="utf-8") as f:
        f.write(json.dumps(result, indent=4) + "\n")

    print(f"\n Results saved to: {output_path}")

if __name__ == "__main__":
    dataset_path = os.path.join("backend", "sample_datasets", "sample.csv")
    if not os.path.exists(dataset_path):
        dataset_path = os.path.join(os.path.dirname(__file__), "sample_datasets", "sample.csv")
    train_and_prove(dataset_path)
