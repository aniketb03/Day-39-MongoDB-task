
// 1. Find all the topics and tasks which are thought in the month of October

db.topics.find(  
    {
    $and:[ 
    {topic_date: {$gte: ISODate("2020-10-15T17:00:00Z"), $lte: ISODate("2020-10-31T18:00:00Z")}}, {"task.task_date":{$gte: ISODate("2020-10-15T17:00:00Z"), $lte: ISODate("2020-10-31T18:00:00Z")}}]
    }  ).pretty()
    
    
   /*-------------------------------------------------------------------------------------------*/
   
   //  2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
    
   db.company_drives.find( 
    {drive_date: {$gte: ISODate("2020-10-15T17:00:00Z"), $lte: ISODate("2020-10-31T18:00:00Z")}}
      ).pretty()
      
      
   /*-------------------------------------------------------------------------------------------*/
   
   //  3.Find all the company drives and students who are appeared for the placement.
    
    db.users.aggregate( [
      {
         $lookup:
            {
               from: "company_drives",
               localField: "company_drives",
               foreignField: "company_id",
               as: "company_drives"
           }
      } ,{ $project : { name : true,_id:false,"company_drives.company":true }}
   ] ).pretty();
   
   
   /*-------------------------------------------------------------------------------------------*/
   
   // 4. Find the number of problems solved by the user in codekata
   
   db.users.aggregate( [
      {
         $lookup:
            {
               from: "codekata",
               localField: "codekata_problems",
               foreignField: "q_id",
               as: "codekata_problems"
           }
      } ,{ $project : { name : true,_id:false,"codekata.category":true, codekataProblems: { $cond: { if: { $isArray: "$codekata_problems" }, then: { $size: "$codekata_problems" }, else: "0"} } }}
   ] ).pretty();
   
   
   
   /*-------------------------------------------------------------------------------------------*/
   
   
   // 5.Find all the mentors with who has the mentee's count more than 15
   
   db.mentors.find(
   {
   mentee_list:{$gt:15}},{mentor_name:1,_id:0,mentee_list:1})
   
   
   /*-------------------------------------------------------------------------------------------*/
   
   
   // 6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
   
   
   db.users.find( { $or: [ { absent_on: { $exists: true, $ne: [] }}, { submitted_task: { $exists: true, $ne: [] }} ] } ).count() 
   