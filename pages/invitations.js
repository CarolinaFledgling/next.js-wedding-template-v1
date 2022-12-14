import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import clientPromise from "../lib/mongodb";
import CardDataSummary from "../src/components/CardDataSummary/CardDataSummary";
import SideBar from "../src/components/SideBar/SideBar";
import NavBarDashboard from "../src/components/NavBarDashboard/NavBarDashboard";
import styles from "../styles/Home.module.css";

const amountPeople = 100;

export default function Invitations({ isConnected }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function getData() {
      const response = await fetch("/api/get-data");
      const responseData = await response.json();
      const all = responseData.all;
      setData(all);
      setLoading(false);
    }

    getData();
  }, []);

  console.log("data featch", data);

  // How many people is coming who answer Yes
  const comingGuests = data.filter((guest) => guest.isComing === "Yes");

  // How many people is coming plus with extra person
  const confirmedPeopleWhoComingAndWithExtraPerson = data.filter((person) => {
    return person.isWithCompanion === true && person.isComing === "Yes";
  });

  // console.log("extra", confirmedPeopleWhoComingAndWithExtraPerson);

  const confirmedPeopleWhoComingAlone = data.filter((person) => {
    return person.isWithCompanion === false && person.isComing === "Yes";
  });

  // console.log("coming but alone", confirmedPeopleWhoComingAlone);

  // How many people is not coming
  const amountNotComingPeople = data.filter((person) => {
    return person.isComing === "No";
  });

  const amountConfirmedPeopleWhoComingAloneOrWithExtraPerson =
    Number(confirmedPeopleWhoComingAndWithExtraPerson.length * 2) +
    Number(confirmedPeopleWhoComingAlone.length);

  // waiting for answer
  const amountPendingPeople =
    amountPeople -
    Number(comingGuests.length) -
    Number(amountNotComingPeople.length);

  //====================================================================================================
  //drinks

  // Number of Children under  3

  const numberChildren = data.filter((person) => {
    return person.isWithChildren === true;
  });

  console.log("numberChildren", numberChildren);

  const numberChildrenUnder3 = numberChildren.map((child) => {
    return child.amountKids;
  });

  console.log("numberChildrenUnder3", numberChildrenUnder3);

  const sumChildrenUnder3 = numberChildrenUnder3.reduce((prev, curr) => {
    return Number(prev) + Number(curr);
  }, 0);

  console.log("sumChildrenUnder3", sumChildrenUnder3);

  //// Number of Children above 3

  const numberChildrenOver3 = numberChildren.map((child) => {
    return child.amountTeenagers;
  });

  console.log("numberChildrenOver3", numberChildrenOver3);

  const sumChildrenAbove3 = numberChildrenOver3.reduce((prev, curr) => {
    return Number(prev) + Number(curr);
  }, 0);

  console.log("sumChildrenAbove3", sumChildrenAbove3);

  return (
    <div>
      {loading ? (
        <Typography
          variant="h3"
          sx={{
            mb: 5,
            textAlign: "center",
          }}
        >
          Loading...
        </Typography>
      ) : (
        <div className={styles.home}>
          <SideBar />
          <div className={styles.homeContainer}>
            <NavBarDashboard />
            <div className={styles.container}>
              <Box
                sx={{
                  mt: "1rem",
                  display: "flex",
                  justifyContent: "center",

                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    mb: 5,
                    mt: 1,
                    textAlign: "left",
                  }}
                >
                  Wedding Guest Invitation Summary
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardDataSummary
                      title="Confirmed"
                      subTitle="Total number of adults coming, plus companions who indicated they are also coming "
                      total={
                        amountConfirmedPeopleWhoComingAloneOrWithExtraPerson
                      }
                      icon={"akar-icons:people-group"}
                      colorIcon="#20A4F3"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <CardDataSummary
                      title="Not Coming"
                      subTitle="Total number of adults  who indicated they are not coming"
                      total={amountNotComingPeople.length}
                      color="info"
                      icon={"emojione-monotone:no-pedestrians"}
                      colorIcon="#011627"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <CardDataSummary
                      title="Children"
                      subTitle="Total number of children under 3 years old"
                      total={sumChildrenUnder3}
                      color="warning"
                      icon={"uil:kid"}
                      colorIcon="#2ec4b6"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardDataSummary
                      title="Children"
                      subTitle="Total number of children over 3 years old"
                      total={sumChildrenAbove3}
                      color="warning"
                      icon={"fluent-emoji-high-contrast:children-crossing"}
                      colorIcon="#C490D1"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <CardDataSummary
                      title={"Pending"}
                      subTitle="Number of invitations not answered"
                      total={amountPendingPeople}
                      color="error"
                      icon={"ic:baseline-pending-actions"}
                      colorIcon="#FF3366"
                    />
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  // Connect with MongoDB
  const client = await clientPromise;

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
