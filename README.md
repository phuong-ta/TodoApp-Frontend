# TodoApp-Frontend

# First clone this repository

# Install dependencies. Make sure you already have nodejs & npm installed in your system.
run command "npm install", and then run "npm start".

# How to use?
1. After serve run (Laravel) already, open this app. Frist page is Login page. 
2. After Login sussecc, page is moved to ToDoList, where user can see own comany's all tasks, and task's detalis. Also in this page, user can create, edit, and delete tasks. With admin account, Admin can see all company's tasks, and can do anything,
3. User page User can see other user, who has same company_id. Can edit and create new user for other person. Only Admin can Delete user.
4. Company page: User can see company information and edit this information, nothing else. Adim can see the list of all Company, and can edit, create, and delete company. 

# Components
1. There is 3 main components in this project. TodoList, CompanyList, UserList. In those components, after login user's role, and companyId are saved, and with this role and companyID, users who have the same companyId can see the list.
2. Each of main Component has 3 small component ( 3 button), Create, Edit, Delete. Those buttons appear according to user's roles. 
