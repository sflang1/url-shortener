import React from "react";
import { Loadable, RecoilState, RecoilValue, useRecoilCallback, useRecoilTransactionObserver_UNSTABLE } from "recoil";

export let getRecoilExternalLoadable: <T>(
  recoilValue: RecoilValue<T>
) => Loadable<T> = () => null as any;

export let setRecoilExternalState: <T>(
  recoilState: RecoilState<T>,
  valOrUpdater: ((currVal: T) => T) | T
) => void = () => null as any;

const RecoilExternalWrapper: React.FC = () => {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    getRecoilExternalLoadable = snapshot.getLoadable;
  });

  useRecoilCallback(({ set }) => {
    setRecoilExternalState = set;

    return async () => {};
  })();

  return null;
};

export default RecoilExternalWrapper;