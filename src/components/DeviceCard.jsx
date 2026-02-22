import './deviceCard.css';
import { 
  MdLaptop, 
  MdDesktopMac, 
  MdPrint, 
  MdScreenshotMonitor, 
  MdRouter,
  MdVideocam,
  MdStorage
} from 'react-icons/md';

const iconMap = {
  MdLaptop: MdLaptop,
  MdDesktopMac: MdDesktopMac,
  MdPrint: MdPrint,
  MdScreenshotMonitor: MdScreenshotMonitor,
  MdRouter: MdRouter,
  MdVideocam: MdVideocam,
  MdStorage: MdStorage,
};

function DeviceCard({ device, onSelect }) {
  const IconComponent = iconMap[device.icon];

  return (
    <div className="device-card" onClick={() => onSelect(device)}>
      <div className="device-card-icon">
        {IconComponent && <IconComponent />}
      </div>
      <p className="device-category">{device.category}</p>
      <button className="select-btn">Select</button>
    </div>
  );
}

export default DeviceCard;
