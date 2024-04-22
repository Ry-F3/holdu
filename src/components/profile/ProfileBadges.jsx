import React from 'react';
// Bootstrap
import { Badge } from 'react-bootstrap';

const ProfileBadges = ({ profile, acceptedConnections }) => {
  const renderStars = (averageRating) => {
    if (averageRating === 0) {
      return "No ratings";
    }
    const integerPart = Math.floor(averageRating);
    const fractionalPart = averageRating - integerPart;
    const stars = [];
    for (let i = 0; i < integerPart; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }
    if (fractionalPart > 0) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    return stars.length > 0 ? stars : "No ratings";
  };


  return (
    <>
      <Badge
        className={`badge p-2 mt-3 text-white badge-${profile.profile_type === "employer" ? "warning" : "info"} ml-2`}
      >
        {profile.profile_type === "employer" ? "I'm looking to hire!" : "I'm looking to work!"}
      </Badge>
      <Badge className="p-2 bg-secondary text-white ml-2">
        {renderStars(profile.average_rating)}
      </Badge>
      <Badge variant="primary" className="p-2 ml-2 mt-2">
        {" "}
        {acceptedConnections.length}+ connections
      </Badge>
    </>
  );
};

export default ProfileBadges;
