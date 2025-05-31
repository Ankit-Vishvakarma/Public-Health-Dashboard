import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "mihy-ui-framework//ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;

const Calculate = Loadable({
  loader: () => import("./Calculate"),
  loading: () => <Loading />
});
const ThingsToKnow = Loadable({
  loader: () => import("./ThingsToKnow"),
  loading: () => <Loading />
});

const BloodDonationProcess = Loadable({
  loader: () => import("./BloodDonationProcess"),
  loading: () => <Loading />
});

const AboutApplication = Loadable({
  loader: () => import("./AboutApplication"),
  loading: () => <Loading />
});

const SearchDonar = Loadable({
  loader: () => import("./SearchDonar"),
  loading: () => <Loading />
});
const RequestDonarDialogBox = Loadable({
  loader: () => import("./RequestDonarDialogBox"),
  loading: () => <Loading />
});
const RegistrationDonar= Loadable({
  loader: () => import("./RegistrationDonar"),
  loading: () => <Loading />
});
const TestMolecules = Loadable({
  loader: () => import("./TestMolecules"),
  loading: () => <Loading />
});

export {
  TestMolecules,
  AboutApplication,
  RequestDonarDialogBox,
  RegistrationDonar,
  SearchDonar,
  BloodDonationProcess,
  Calculate,
  ThingsToKnow
}
