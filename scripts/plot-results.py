"""Rebuild the standalone, downloadable figure from the supplied summary CSV."""
import csv
import os
os.environ.setdefault('MPLCONFIGDIR', '/tmp/portfolio-matplotlib')
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

root = Path(__file__).resolve().parent.parent
results = root / 'public/results/anomaly'
rows = list(csv.DictReader((results / 'synthetic_summary_3seeds.csv').open()))
plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 11, 'svg.fonttype': 'none'})
fig, ax = plt.subplots(figsize=(9, 5.5), layout='constrained')
fig.patch.set_facecolor('#f8fafc')
ax.set_facecolor('#f8fafc')
for method, color, marker in [('Pair-control', '#778395', 's'), ('Proposed', '#07899f', 'o')]:
    group = sorted([r for r in rows if r['method'] == method], key=lambda r: float(r['overlap']))
    ax.errorbar([float(r['overlap'])*100 for r in group], [float(r['auprc_mean']) for r in group],
                yerr=[float(r['auprc_std']) for r in group], label=method, color=color, marker=marker,
                linewidth=2, markersize=7, capsize=5)
ax.set_title('Personal PyTorch experiment, 3 seeds\nSynthetic anomaly detection', loc='left', fontsize=16, fontweight='bold', pad=22)
ax.set_xlabel('Anomaly–missing overlap (%)', labelpad=12)
ax.set_ylabel('AUPRC ↑', labelpad=10)
ax.set_xticks([0,50,100]); ax.set_ylim(0,.8); ax.set_xlim(-5,105)
ax.spines[['top','right']].set_visible(False)
ax.spines[['bottom','left']].set_color('#bac6ce')
ax.grid(axis='y',alpha=.18); ax.legend(frameon=False, loc='lower left')
ax.annotate('+16.6% relative\n(+0.0836 absolute)', xy=(50,.5860936305606148), xytext=(58,.69),
            fontsize=10, color='#087a90', arrowprops={'arrowstyle':'->','color':'#087a90','lw':1})
fig.supxlabel('Missing rate 20% · mean ± sample SD · seeds 11, 22, 33\nPersonal experiment only; team TensorFlow results not included.',fontsize=9,color='#526273')
for suffix in ['svg','png']:
    fig.savefig(results/f'auprc-overlap-3seeds.{suffix}',dpi=180)
plt.close(fig)
