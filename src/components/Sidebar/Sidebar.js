import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  GpsFixed as GpsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  TrackChanges as TrackChangeIcon,
  LocationCity as LocationCityIcon, 
  SettingsInputAntenna as AntennaIcon,
  WifiTethering as WifiIcon,
  Restore as RestoreIcon,
  Receipt as ReceiptIcon,
  Looks as LooksIcon

} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure_old = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Typography",
    link: "/app/typography",
    icon: <TypographyIcon />,
  },
  { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
  {
    id: 3,
    label: "Notifications",
    link: "/app/notifications",
    icon: <NotificationsIcon />,
  },
  {
    id: 4,
    label: "UI Elements",
    link: "/app/ui",
    icon: <UIElementsIcon />,
    children: [
      { label: "Icons", link: "/app/ui/icons" },
      { label: "Charts", link: "/app/ui/charts" },
      { label: "Maps", link: "/app/ui/maps" },
    ],
  },
  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "HELP" },
  { id: 7, label: "Library", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  { id: 8, label: "Support", link: "https://flatlogic.com/forum", icon: <SupportIcon /> },
  { id: 9, label: "FAQ", link: "https://flatlogic.com/forum", icon: <FAQIcon /> },
  { id: 10, type: "divider" },
  { id: 11, type: "title", label: "PROJECTS" },
  {
    id: 12,
    label: "My recent",
    link: "",
    icon: <Dot size="small" color="warning" />,
  },
  {
    id: 13,
    label: "Starred",
    link: "",
    icon: <Dot size="small" color="primary" />,
  },
  {
    id: 14,
    label: "Background",
    link: "",
    icon: <Dot size="small" color="secondary" />,
  },
];
const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <LooksIcon /> },
  
  {
    id: 1,
    label: "Trail",
    link: "/app/ui",
    icon: <RestoreIcon />,
    children: [
      { id:101, label: "Trail" ,link: "/app/trails/history",icon :<TrackChangeIcon/> },
    ],
  },
  {
    id: 2,
    label: "Geofence",
    link: "/app/ui",
    icon: <GpsIcon />,
    children: [
      { id:201, label: "Configuration" ,link: "/app/geofence/geofence-config",icon :<TrackChangeIcon/> },
      // { label: "Icons", link: "/app/ui/icons" },
      // { label: "Charts", link: "/app/ui/charts" },
       { id:202, label: "Group",  link: "/app/geofence/geofence-group",icon :<LocationCityIcon/> },
       { id:203, label: "Stats",  link: "/app/geofence/geofence-stat",icon :<LocationCityIcon/> },
    ],
  },
  {
    id: 3,
    label: "Reports",
    link: "/app/ui",
    icon: <ReceiptIcon />,
    children: [
      { id:301, label: "Devices" ,link: "/app/reports/device-report",icon :<TrackChangeIcon/> },
      
    ],
  },
  {
    id: 4,
    label: "Live",
    link: "/app/ui",
    icon: <WifiIcon />,
    children: [
      { id:401, label: "Devices List" ,link: "/app/live/devicelist",icon :<TrackChangeIcon/> },
      { id:402, label: "Maps",  link: "/app/live/maps",icon :<LocationCityIcon/> },
    ],
  },
  {
    id: 5,
    label: "Alarm",
    link: "/app/ui",
    icon: <NotificationsIcon />,
    children: [
      { id:401, label: "Configuration" ,link: "/app/alarm/alarm-config",icon :<TrackChangeIcon/> },
      // { label: "Icons", link: "/app/ui/icons" },
      // { label: "Charts", link: "/app/ui/charts" },
       { id:402, label: "Logs",  link: "/app/alarm/alarm-log",icon :<LocationCityIcon/> },
    ],
  },
  { id: 6, type: "divider" },
  { id: 7, type: "title", label: "HELP" },
  {
    id: 8,
    label: "Notifications",
    link: "/app/notifications",
    icon: <NotificationsIcon />,
  },
  { id: 9, label: "Library", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  { id: 10, label: "Support", link: "https://flatlogic.com/forum", icon: <SupportIcon /> },
  { id: 11, label: "FAQ", link: "https://flatlogic.com/forum", icon: <FAQIcon /> },
  { id: 12, label: "Test",  icon: <AntennaIcon /> , 
  children: [
    { label: "Icons", link: "/app/ui/icons" },
    { label: "Charts", link: "/app/ui/charts" },
    { label: "Maps", link: "/app/ui/maps" },
    { label: "tables", link: "/app/tables" },
  ],
  },
  { id: 13, type: "divider" }
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    // if (isSmallScreen && isPermanent) {
    //   setPermanent(false);
    // } else if (!isSmallScreen && !isPermanent) {
    //   setPermanent(true);
    // }
  }
}

export default withRouter(Sidebar);
