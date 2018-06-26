import { Dispatch } from "react-redux";
import { matchingApi } from "../api/matchingClient";
import { Action, EmptyAction } from "./index";

export enum MatchingActions {
  MatchingFailure = "matching_failed",

  AcceptPotentialMatch = "accept_match",
  RejectPotentialMatch = "reject_match",
}

const matchingFailure = () : EmptyAction => ({
  type: MatchingActions.MatchingFailure,
});

export const acceptMatchWithEmail = (emailAddress: string) : Action<string> => ({
  type: MatchingActions.AcceptPotentialMatch,
  value: emailAddress,
});

export const rejectMatchWithEmail = (emailAddress: string) : Action<string> => ({
  type: MatchingActions.RejectPotentialMatch,
  value: emailAddress,
});

export const acceptPotentialMatchWithEmail = (emailAddress: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await matchingApi.acceptPotentialMatch(emailAddress);
      dispatch(acceptMatchWithEmail(emailAddress));
    } catch {
      dispatch(matchingFailure());
    }
  };
};

export const rejectPotentialMatchWithEmail = (emailAddress: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await matchingApi.rejectPotentialMatch(emailAddress);
      dispatch(rejectMatchWithEmail(emailAddress));
    } catch {
      dispatch(matchingFailure());
    }
  };
};
