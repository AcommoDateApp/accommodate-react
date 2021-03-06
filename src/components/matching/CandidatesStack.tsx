import { Col, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { AccommoDateState } from "../../state";
import {
  Biography,
  RealEstate,
  TenantBiography,
} from "../../state/biography";
import { Matchable, UserMatches } from "../../state/match";
import { RealEstateCard } from "../cards/RealEstateCard";
import { TenantBiographyCard } from "../cards/TenantBiographyCard";
import { MatchingButtons } from "./MatchingButtons";

interface CandidatesStackProps {
  userMatches: UserMatches;
  biography: Biography;
}

const CandidatesStackComponent = (props: CandidatesStackProps) => {
  const noPotentialMatchesLeft = props.userMatches.potentialMatches.length <= 0;
  if (noPotentialMatchesLeft || !props.biography) {
    return <h3>No one else around you...</h3>;
  }

  const match = props.userMatches.potentialMatches[0];
  const loggedUserBiography = props.biography;
  const potentialMatch = renderPotentialMatch(match);

  return (
    <Row>
      <Col>
        <h1>Potential Matches</h1>
        {potentialMatch}
        <MatchingButtons
          potentialMatch={match}
          loggedUserBiography={loggedUserBiography}
        />
      </Col>
    </Row>
  );
};

const renderPotentialMatch = (potentialMatch: Matchable) : JSX.Element => {
  const potentialMatchIsATenant = "mode" in potentialMatch;
  if (potentialMatchIsATenant) {
    return <TenantBiographyCard biography={potentialMatch as TenantBiography} />;
  } else {
    return (
      <RealEstateCard
        realEstate={potentialMatch as RealEstate}
      />
    );
  }
};

const mapStateToProps = (state: AccommoDateState) : CandidatesStackProps => ({
  biography: (state.biography.value as Biography),
  userMatches: state.matchingState.userMatches,
});

export const CandidatesStack = connect(mapStateToProps)(CandidatesStackComponent);
