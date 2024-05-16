export interface User {
  user_id: number;
  username: string;
}

export interface TrackerItem {
  tracker_id: number;
  user_id: number;
  tracker_name: string;
  savings_goal: number;
  needs_goal: number;
  wants_goal: number;
  year: boolean;
  month: boolean;
}

export interface listUser {
  username: String;
  id: number;
}

/**
 *
 * [{"trackerId":3,"userId":2,"trackerName":"New Savings Tracker","savingsGoal":1000.00,"needsGoal":null,"wantsGoal":null,"tracker_name":"New Savings Tracker","user_id":2,"year":true,"month":false,"savings_goal":1000.00,"wants_goal":null,"needs_goal":null},{"trackerId":4,"userId":2,"trackerName":"Newer Savings Tracker","savingsGoal":1000.00,"needsGoal":null,"wantsGoal":null,"tracker_name":"Newer Savings Tracker","user_id":2,"year":true,"month":false,"savings_goal":1000.00,"wants_goal":null,"needs_goal":null},{"trackerId":2,"userId":2,"trackerName":"My Savings Tracker","savingsGoal":1000.50,"needsGoal":300.00,"wantsGoal":150.00,"tracker_name":"My Savings Tracker","user_id":2,"year":true,"month":false,"savings_goal":1000.50,"wants_goal":150.00,"needs_goal":300.00}]
 */
