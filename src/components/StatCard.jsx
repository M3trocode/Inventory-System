import './statCard.css';

function StatCard({ label, value, icon }) {
  const getIconClass = (label) => {
    switch (label.toLowerCase()) {
      case 'faulty':
        return 'stat-icon icon-red';
      case 'issued':
        return 'stat-icon icon-grey';
        case 'total devices':
        return 'stat-icon icon-black';
      default:
        return 'stat-icon';
    }
  };

  return (
    <div className="stat-card">
      <div>
        <p className="stat-label">{label}</p>
        <h2 className="stat-value">{value}</h2>
      </div>

      <div className={getIconClass(label)}>
        {typeof icon === 'string' ? icon : <span className="react-icon">{icon}</span>}
      </div>
    </div>
  );
}

export default StatCard;
