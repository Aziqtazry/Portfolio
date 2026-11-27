import StationReceiver from './StationReceiver.jsx';
import ProjectBroadcast from './ProjectBroadcast.jsx';
import './PortfolioStation.css';

export default function PortfolioStation({ index, tune, sound }) {
  return (
    <div className="station-home" id="home">
      <StationReceiver index={index} tune={tune} sound={sound} />
      <div className="station-width">
        <ProjectBroadcast key={index} index={index} tune={tune} />
      </div>
    </div>
  );
}
