/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import { createDirectus, readItems, rest } from "@directus/sdk";

export default function data() {
  const directus = createDirectus("http://159.146.31.32:8055/").with(rest());
  const [taskList, setTaskList] = useState([]);

  const getData = async () => {
    try {
      
      const taskResponse = await directus.request(
        readItems('task', {
          fields: ['*'],
        })
      );

      setRows(taskResponse)

    } catch (err) {
      console.error("task failed:", err);
    
    }
  };
  useEffect(() => {
    getData();

  }, [])


  const TaskName = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );


  const setRows = (tasks) => {
    let list = []

    if(tasks != null && tasks.length > 0){

      tasks.forEach(element => {

        var desc  = element?.description.replace(/<\/?p>/g, '');

        let item = {
          summary : <TaskName image={logoJira} name={element?.summary} />,
          description : (
            <MDTypography variant="caption" color="text" fontWeight="medium">
             {desc}
            </MDTypography>
          ),
          status : (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {element?.status}
            </MDTypography>
          ),
          dueDate : (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {element?.due_date}
            </MDTypography>
          ),
        }
        list.push(item)
      });

    }
    
    setTaskList(list)
  }

  return {
    columns: [
      { Header: "Görev Adı", accessor: "summary", width: "45%", align: "left" },
      { Header: "Açıklama", accessor: "description", width: "45%", align: "left" },
      { Header: "Durum", accessor: "status", width: "10%", align: "left" },
      { Header: "Tamamlanması Gereken Tarih", accessor: "dueDate", align: "center" },
    ],

    rows: taskList
  };
}
