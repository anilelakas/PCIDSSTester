import Select from "react-select";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import Input from "@mui/material/TextField";
import arrow from "./arrow.jpg";
import encoder from "plantuml-encoder";

const options = [
  { label: "ATM" },
  { label: "E-Banking" },
  { label: "Router" },
  { label: "Switch" },
  { label: "Firewall" },
  { label: "Provider" },
  { label: "DMZ" },
  { label: "Database" },
  { label: "Backup DB" },
  { label: "Server" },
  { label: "CDE" },
  { label: "Cardholder Database" },
];

const textInput = `
@startuml

!define osaPuml https://raw.githubusercontent.com/Crashedmind/PlantUML-opensecurityarchitecture2-icons/master
!include osaPuml/Common.puml
!include osaPuml/User/all.puml
!include osaPuml/Hardware/all.puml
!include osaPuml/Misc/all.puml
!include osaPuml/Server/all.puml
!include osaPuml/Site/all.puml


{outputText}

@enduml

`;

export default function App() {
  const [inputList, setInputList] = useState([
    { type1: "", name1: "", type2: "", name2: "", uniqueId: uuidv4() },
  ]);

  const [outputText, setOutputText] = useState("");
  const [firewallText, setfirewallText] = useState("");
  const [cdeText, setcdeText] = useState("");
  const [resultText, setResultText] = useState("");
  const [typeText, setTypeText] = useState("");
  const [messageText, setMessageText] = useState("");

  const entrancePoints = ["ATM", "Provider", "E-Banking"];
  const endPoints = ["DMZ", "Database", "Backup DB", "Server", "Switch", "CDE"];

  function draw(diagram) {
    return "https://www.plantuml.com/plantuml/svg/" + encoder.encode(diagram);
  }

  const getUmlText = (inputList) => {
    let definitionText = "";
    let relationText = "";
    let typeText = "";
    let outputTextStr = "";

    inputList.forEach((item) => {
      if (item.type1 === "ATM") {
        definitionText += `
        osa_user_blue(${item.name1.replace(/ /g, "")}, "${item.name1}", "", "${
          item.name1
        }")
        `;
      }
      if (item.type2 === "ATM") {
        definitionText += `
        osa_user_blue(${item.name2.replace(/ /g, "")}, "${item.name2}", "", "${
          item.name2
        }")
        `;
      }
      if (item.type1 === "CDE") {
        definitionText += `
        osa_user_blue(${item.name1.replace(/ /g, "")}, "${item.name1}", "", "${
          item.name1
        }")
        `;
      }
      if (item.type2 === "CDE") {
        definitionText += `
        osa_user_blue(${item.name2.replace(/ /g, "")}, "${item.name2}", "", "${
          item.name2
        }")
        `;
      }
      if (item.type1 === "E-Banking") {
        definitionText += `
        osa_user_blue(${item.name1.replace(/ /g, "")}, "${item.name1}", "", "${
          item.name1
        }")
        `;
      }
      if (item.type2 === "E-Banking") {
        definitionText += `
        osa_user_blue(${item.name2.replace(/ /g, "")}, "${item.name2}", "", "${
          item.name2
        }")
        `;
      }
      if (item.type1 === "Router") {
        definitionText += `
        osa_device_wireless_router(${item.name1.replace(/ /g, "")}, "${
          item.name1
        }", "", "${item.name1}")
        `;
      }
      if (item.type2 === "Router") {
        definitionText += `
        osa_device_wireless_router(${item.name2.replace(/ /g, "")}, "${
          item.name2
        }", "", "${item.name2}")
        `;
      }
      if (item.type1 === "Switch") {
        definitionText += `
        osa_hub(${item.name1.replace(/ /g, "")}, "${item.name1}", "", "${
          item.name1
        }")
        `;
      }
      if (item.type2 === "Switch") {
        definitionText += `
        osa_hub(${item.name2.replace(/ /g, "")}, "${item.name2}", "", "${
          item.name2
        }")
        `;
      }
      if (item.type1 === "Server") {
        definitionText += `
        osa_server(${item.name1.replace(/ /g, "")}, "${item.name1}", "${
          item.name1
        }")
        `;
      }
      if (item.type2 === "Server") {
        definitionText += `
        osa_server(${item.name2.replace(/ /g, "")}, "${item.name2}", "${
          item.name2
        }")
        `;
      }
      if (item.type1 === "Database" || item.type1 === "Backup DB") {
        definitionText += `
        osa_database(${item.name1.replace(/ /g, "")}, "${item.name1}", "${
          item.name1
        }")
        `;
      }
      if (item.type2 === "Database" || item.type2 === "Backup DB") {
        definitionText += `
        osa_database(${item.name2.replace(/ /g, "")}, "${item.name2}", "${
          item.name1
        }")
        `;
      }
      if (item.type1 === "Firewall") {
        definitionText += `
        osa_firewall(${item.name1.replace(/ /g, "")}, "${item.name1}", "${
          item.name1
        }")
        `;
      }
      if (item.type2 === "Firewall") {
        definitionText += `
        osa_firewall(${item.name2.replace(/ /g, "")}, "${item.name2}", "${
          item.name2
        }")
        `;
      }
      if (item.type1 === "Provider") {
        definitionText += `
        osa_cloud(${item.name1.replace(/ /g, "")}, "${item.name1}", "", "${
          item.name1
        }")
        `;
      } else if (item.type2 === "Provider") {
        definitionText += `
        osa_cloud(${item.name2.replace(/ /g, "")}, "${item.name2}", "", "${
          item.name2
        }")
        `;
      }
      relationText += `${item.name1.replace(/ /g, "")} --> ${item.name2.replace(
        / /g,
        ""
      )}
      `;
      typeText += item.type1 + " --> " + item.type2 + "\n";
    });
    outputTextStr = definitionText + relationText;
    setOutputText(textInput.replace("{outputText}", outputTextStr));
    setResultText(relationText);
    setTypeText(typeText);

    const resultArray = typeText
      .trim()
      .split("\n")
      .map((item) => item.trim().split("-->"));

    let relationList = [];

    resultArray.forEach((element) => {
      if (
        !JSON.stringify(relationList).includes(
          JSON.stringify(element.map((item) => item.trim()))
        )
      ) {
        if (
          relationList.some((item) => element[0].trim() === item.at(-1).trim())
        ) {
          relationList.forEach((relation, index) => {
            if (element[0].trim() === relation.at(-1).trim()) {
              relationList.push([...relation, element[1].trim()]);
            }
          });
        } else {
          relationList.push(element.map((item) => item.trim()));
        }
      }
    });
    let messageTextFinal = "";

    relationList.forEach((relation) => {
      if (relation.length > 1) {
        const firewallText2 = firewallCheck(relation);
        messageTextFinal += firewallText2;
        const cdeText2 = cdeCheck(relation);
        messageTextFinal += cdeText2;
      }
    });
    setMessageText(messageTextFinal);
    console.log(relationList, resultArray);
  };

  const firewallCheck = (relation) => {
    let firewall = "Firewall";
    let switchStr = "Switch";
    let msg = "";
    let result = false;
    let messageTextStr = "";

    if (
      entrancePoints.includes(relation[0]) &&
      endPoints.includes(relation.at(-1))
    ) {
      if (relation.indexOf(firewall) > 0) {
        if (
          (relation.indexOf(switchStr) > 0 &&
            relation.indexOf(switchStr) > relation.indexOf(firewall)) ||
          relation.indexOf(switchStr) < 0
        ) {
          result = true;
          msg = " --> Rule 1 and Rule 2 and Rule 3 Checked!\n";
        } else if (
          relation.indexOf(switchStr) > 0 &&
          relation.indexOf(switchStr) < relation.indexOf(firewall)
        ) {
          msg = " --> There must be a Firewall between Internet and Switch!\n";
        }
      } else {
        result = false;
        msg =
          " --> No firewall between " +
          relation[0] +
          " and " +
          relation.at(-1) +
          "!\n";
      }
    } else {
      msg = " --> No initial point or end point component!\n";
    }
    messageTextStr += "Path: " + relation.join(",") + " --> " + result + msg;
    return messageTextStr;
  };

  const cdeCheck = (relation) => {
    let cdeStr = "CDE";
    let cdeDB = "Cardholder Database";
    let dmzStr = "DMZ";
    let eBanking = "E-Banking";
    let firewall = "Firewall";
    let msg = "";
    let result = false;
    let messageTextStr = "";

    if (relation.indexOf(cdeStr) > 0) {
      if (relation.indexOf(cdeDB) > 0) {
        if (
          relation.indexOf(cdeStr) + 1 === relation.indexOf(cdeDB) ||
          relation.indexOf(cdeStr) - 1 === relation.indexOf(cdeDB)
        ) {
          result = true;
          msg = " --> Rule 4 Checked!\n";
          messageTextStr +=
            "Path: " + relation.join(",") + " --> " + result + msg;
        } else {
          result = false;
          msg = " --> Cardholder DB can only have path with CDE. !\n";
          messageTextStr +=
            "Path: " + relation.join(",") + " --> " + result + msg;
        }
        if (
          relation.indexOf(cdeStr) >
            relation.indexOf(firewall) >
            relation.indexOf(eBanking) ||
          relation.indexOf(cdeStr) <
            relation.indexOf(firewall) <
            relation.indexOf(eBanking)
        ) {
          result = true;
          msg = " --> Rule 5 Checked!\n";
          messageTextStr +=
            "Path: " + relation.join(",") + " --> " + result + msg;
        } else {
          result = false;
          msg = " --> There must be a Firewall between CDE and Internet!\n";
          messageTextStr +=
            "Path: " + relation.join(",") + " --> " + result + msg;
        }
      } else {
        result = false;
        msg =
          " --> Rule 4 and Rule 5 can't be checked! No Cardholder Database! \n";
        messageTextStr +=
          "Path: " + relation.join(",") + " --> " + result + msg;
      }

      if (relation.indexOf(dmzStr) > 0) {
        if (
          relation.indexOf(dmzStr) >
            relation.indexOf(firewall) >
            relation.indexOf(cdeStr) ||
          relation.indexOf(dmzStr) <
            relation.indexOf(firewall) <
            relation.indexOf(cdeStr)
        ) {
          result = true;
          msg = " --> Rule 6 Checked!\n";
          messageTextStr +=
            "Path: " + relation.join(",") + " --> " + result + msg;
        } else {
          result = false;
          msg = " --> There must be a Firewall between CDE and DMZ!\n";
          messageTextStr +=
            "Path: " + relation.join(",") + " --> " + result + msg;
        }
        if (
          relation.indexOf(dmzStr) >
            relation.indexOf(firewall) >
            relation.indexOf(eBanking) ||
          relation.indexOf(dmzStr) <
            relation.indexOf(firewall) <
            relation.indexOf(eBanking)
        ) {
          result = true;
          msg = " --> Rule 7 Checked!\n";
          messageTextStr +=
            "Path: " + relation.join(",") + " --> " + result + msg;
        } else {
          result = false;
          msg = " --> There must be a Firewall between DMZ and Internet!\n";
          messageTextStr +=
            "Path: " + relation.join(",") + " --> " + result + msg;
        }
      }
    } else {
      result = false;
      msg = " --> Rule 4 and Rule 5 and Rule 6 can't be checked! No CDE! \n";
      messageTextStr += "Path: " + relation.join(",") + " --> " + result + msg;
    }
    return messageTextStr;
  };

  const handleInputAdd = () => {
    setInputList([
      ...inputList,
      { type1: "", name1: "", type2: "", name2: "", uniqueId: uuidv4() },
    ]);
    console.log(inputList);
  };

  const handleInputRemove = (uniqueId) => {
    setInputList((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      rowSpacing={5}
      marginLeft="20px"
      marginTop="20px"
    >
      {inputList.map((data, index) => (
        <div key={data.uniqueId}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            marginLeft="10px"
            marginTop="20px"
            spacing={1}
          >
            <Grid item xs={4}>
              <Select
                style={{ width: "40px" }}
                value={{ label: data.type1 }}
                onChange={(e) =>
                  setInputList(
                    inputList.map((item) => ({
                      ...item,
                      type1:
                        item.uniqueId === data.uniqueId ? e.label : item.type1,
                    }))
                  )
                }
                options={options}
              />
            </Grid>
            <Grid item xs={4}>
              <img
                style={{ width: 100, height: 60, marginLeft: "80px" }}
                src={arrow}
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                style={{ width: "40px" }}
                value={{ label: data.type2 }}
                onChange={(e) =>
                  setInputList(
                    inputList.map((item) => ({
                      ...item,
                      type2:
                        item.uniqueId === data.uniqueId ? e.label : item.type2,
                    }))
                  )
                }
                options={options}
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                style={{ marginBottom: "10px" }}
                label="Name"
                variant="outlined"
                type="text"
                id="name1"
                value={data.name1}
                onChange={(e) =>
                  setInputList(
                    inputList.map((item) => ({
                      ...item,
                      name1:
                        item.uniqueId === data.uniqueId
                          ? e.target.value
                          : item.name1,
                    }))
                  )
                }
              />
            </Grid>

            <Grid item xs={4}>
              <Input
                style={{ marginBottom: "10px", marginLeft: "100px" }}
                label="Name"
                variant="outlined"
                type="text"
                id="name2"
                value={data.name2}
                onChange={(e) =>
                  setInputList(
                    inputList.map((item) => ({
                      ...item,
                      name2:
                        item.uniqueId === data.uniqueId
                          ? e.target.value
                          : item.name2,
                    }))
                  )
                }
              />
            </Grid>
          </Grid>
          {inputList.length > 1 && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              style={{ marginLeft: "1px", marginBottom: "20px" }}
              onClick={() => handleInputRemove(data.uniqueId)}
            >
              Remove
            </Button>
          )}

          {inputList.length - 1 === index && inputList.length < 25 && (
            <Button
              variant="contained"
              style={{ marginLeft: "5px" }}
              size="small"
              onClick={handleInputAdd}
            >
              Add a component
            </Button>
          )}
        </div>
      ))}
      <Button
        size="small"
        variant="contained"
        style={{ height: "30px", marginLeft: "5px" }}
        onClick={(e) => {
          getUmlText(inputList);
        }}
      >
        Submit
      </Button>
      {outputText && <img src={draw(outputText)} alt={"UML Diagram"} />}
      {messageText && (
        <div
          style={{ marginTop: "10px", marginBottom: "50px", fontWeight: "800" }}
        >
          {messageText.split("\n").map((i, key) => {
            return <div key={key}>{i}</div>;
          })}
        </div>
      )}
    </Grid>
  );
}
