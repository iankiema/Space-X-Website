import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css';

function Profiles() {
  const joinedMissions = useSelector((state) => state.missions.joinedMissions);
  const allMissions = useSelector((state) => state.missions.missions);

  // Filter missions based on joinedMissions
  const activeMissions = allMissions.filter(
    (mission) => joinedMissions.includes(mission.mission_id),
  );
  const { rockets } = useSelector((state) => state.rockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved === true);

  return (
    <div className="container">

      <div className="profiles-container">
        <h2 className="profile-missions-heading">My Rockets</h2>
        <table className="profile-missions-table">
          <tbody>
            {reservedRockets.map((rocket) => (
              <tr key={rocket.id}>
                <td>{rocket.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="profiles-container">
        <h2 className="profile-missions-heading">My Missions</h2>
        <table className="profile-missions-table">
          <tbody>
            {activeMissions.map((mission) => (
              <tr key={mission.mission_id}>
                <td>{mission.mission_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Profiles;
