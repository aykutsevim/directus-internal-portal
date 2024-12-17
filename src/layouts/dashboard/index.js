/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { createDirectus, authentication, rest, readMe, readItems, readSingleton } from "@directus/sdk";
import { useEffect, useState } from "react";
import TaskList from "./components/Tasks";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const directus = createDirectus("http://159.146.31.32:8055/").with(rest());
  const [taskList, setTaskList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [advertList, setAdvertList] = useState([]);

  const getData = async () => {
    try {
      
      const taskResponse = await directus.request(
        readItems('task', {
          fields: ['*'],
        })
      );
      

      const eventsResponse = await directus.request(
        readItems('etkinlik_takvimi', {
          fields: ['*'],
        })
      );

      const contactsResponse = await directus.request(
        readItems('telefon_rehberi', {
          fields: ['*'],
        })
      );


      const residentalResponse = await directus.request(
        readItems('konutilan', {
          fields: ['*'],
        })
      );
      setTaskList(taskResponse)
      setEventList(eventsResponse)
      setContactList(contactsResponse)
      setAdvertList(residentalResponse)

    } catch (err) {
      console.error("task failed:", err);
    
    }
  };
  useEffect(() => {
    getData();

  }, [])


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Görevler"
                count={taskList !== null ? taskList.length : 0}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "en güncel",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Etkinlik Takvimi"
                count={eventList !== null ? eventList.length : 0}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "en gücel",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="İlanlar"
                count={advertList !== null ? advertList.length : 0}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "en güncel",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Telefon Rehberi"
                count={contactList !== null ? contactList.length : 0}
                percentage={{
                  color: "success",
                  
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <TaskList />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
