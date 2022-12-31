/*  1.Design database for Zen class programme
users
codekata
attendance
topics
tasks
company_drives
mentors
*/
-> db.zenprogram.insert({users:"",codekata:"",attendance:"",topics:"",task:"",company_drives:"",mentors:""});

/*  2.Find all the topics and tasks which are thought in the month of October */

-> db.zenprogram.find({},{topics:1,tasks:1,month:"October"}).pretty();

/* 3.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020 */

->db.zenprogram.find({ month: { $gt: new Date('2020-oct-15'), $lt: new Date('2020-oct-31')}},{company_drive:1}).pretty();

/* 4.Find all the company drives and students who are appeared for the placement. */

->db.zenprogram.find({},{company_drive:appeared,users:1}).pretty();

/* 5.Find the number of problems solved by the user in codekata*/

-> db.zenprogram.find({},{users:1,codekata:1}).pretty();

/* 6.Find all the mentors with who has the mentee's count more than 15*/

-> db.zenprogram.find({count:{$gt:15}},{mentors:1})

/* 7.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020*/

-> db.zenprogram.find({month: { $gt: new Date('2020-oct-15'), $lt: new Date('2020-oct-31')}},{task:"not submitted",attendance:"absent"});