/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  fetchMissions,
  joinMission,
  leaveMission,
} from '../redux/Missions/missionsSlice';
import '../App.css';

function Missions() {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions.missions);
  const [activeMembers, setActiveMembers] = useState({});

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  const handleJoinMission = (missionId) => {
    dispatch(joinMission(missionId));
    setActiveMembers({ ...activeMembers, [missionId]: true });
  };

  const handleLeaveMission = (missionId) => {
    dispatch(leaveMission(missionId));
    setActiveMembers({ ...activeMembers, [missionId]: false });
  };

  const getMembershipLabel = (mission) => (
    activeMembers[mission.mission_id]
      ? 'ACTIVE MEMBER'
      : 'NOT A MEMBER');

  const getButtonStyles = (mission) => {
    if (activeMembers[mission.mission_id]) {
      return {
        background: 'transparent',
        border: '1px solid red',
        color: 'red',
      };
    }
    return {
      background: 'transparent',
      border: '1px solid rgb(95, 92, 92)',
      color: 'rgb(95, 92, 92)',
    };
  };

  return (
    <div className="missions-container">
      <table className="missions-table">
        <thead>
          <tr>
            <th>Mission</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr
              key={mission.mission_id}
              className={classNames(
                { active: activeMembers[mission.mission_id] },
              )}
            >
              <td className="mission-name">{mission.mission_name}</td>
              <td>{mission.description}</td>
              <td>
                <p
                  className={classNames('membership-label', {
                    'active-member-label': activeMembers[mission.mission_id],
                  })}
                >
                  {getMembershipLabel(mission)}
                </p>

              </td>
              <td>
                <button
                  type="button"
                  className="action-button"
                  style={getButtonStyles(mission)}
                  onClick={() => (
                    activeMembers[mission.mission_id]
                      ? handleLeaveMission(mission.mission_id)
                      : handleJoinMission(mission.mission_id)
                  )}
                >
                  {activeMembers[mission.mission_id] ? 'Leave Mission' : 'Join Mission'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Missions;
