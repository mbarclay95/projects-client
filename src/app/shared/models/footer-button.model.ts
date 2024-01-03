import {IconDefinition} from '@fortawesome/free-brands-svg-icons';
import {faChartPie, faPeopleGroup, faPeopleRoof, faTableList, faTasks} from '@fortawesome/free-solid-svg-icons';

export interface FooterButton {
  path: string,
  icon: IconDefinition,
  title: string
}

export const defaultTaskButtons = [
  {
    icon: faTasks,
    title: 'To Do',
    path: '/app/tasks/weekly-tasks'
  },
  {
    icon: faPeopleRoof,
    title: 'My Family',
    path: '/app/tasks/my-family'
  },
  {
    icon: faChartPie,
    title: 'Stats',
    path: '/app/tasks/stats'
  },
  {
    icon: faTableList,
    title: 'Tasks',
    path: '/app/tasks/tasks'
  },
];

export const taskFamiliesButton = {
  icon: faPeopleGroup,
  title: 'Families',
  path: '/app/tasks/families'
};
