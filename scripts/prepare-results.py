"""Refresh the build-time result data after replacing the supplied CSVs.
Run verification separately first: python scripts/verify-results.py
"""
import csv
import json
from pathlib import Path
root = Path(__file__).resolve().parent.parent
results = root / 'public/results/anomaly'
data = {
    'synthetic': list(csv.DictReader((results / 'synthetic_summary_3seeds.csv').open())),
    'tep': list(csv.DictReader((results / 'tep_fault_macro_summary_3seeds.csv').open())),
}
(root / 'src/experiment-results.json').write_text(json.dumps(data, indent=2) + '\n')
