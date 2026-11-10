"""Verify the supplied summaries against per-seed data without modifying inputs."""
import csv
import math
import statistics
from pathlib import Path
root = Path(__file__).resolve().parent.parent / 'public/results/anomaly'
raw = list(csv.DictReader((root / 'synthetic_per_seed.csv').open()))
for row in csv.DictReader((root / 'synthetic_summary_3seeds.csv').open()):
    for metric in ['auprc', 'mae']:
        values = [float(r[metric]) for r in raw if r['method'] == row['method'] and
                  float(r['overlap']) == float(row['overlap']) and r['kind'] == 'all' and r[metric]]
        if not values:
            continue
        assert len(values) == 3
        assert math.isclose(statistics.mean(values), float(row[metric + '_mean']), abs_tol=1e-12)
        assert math.isclose(statistics.stdev(values), float(row[metric + '_std']), abs_tol=1e-12)
raw = list(csv.DictReader((root / 'tep_per_seed.csv').open()))
for row in csv.DictReader((root / 'tep_fault_macro_summary_3seeds.csv').open()):
    means = []
    for seed in ['11', '22', '33']:
        values = [float(r['recall']) for r in raw if r['method'] == row['method'] and
                  r['seed'] == seed and r['fault'].isdigit()]
        assert len(values) == 20 # Excludes the already-aggregated `mean` row.
        means.append(statistics.mean(values))
    assert math.isclose(statistics.mean(means), float(row['recall_mean']), abs_tol=1e-12)
    assert math.isclose(statistics.stdev(means), float(row['recall_std']), abs_tol=1e-12)
print('PASS: supplied means and sample SD match raw data; 3 seeds, 20 TEP faults per seed.')
