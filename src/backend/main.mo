import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

actor {
  type Category = {
    #personal;
    #work;
    #academic;
  };

  module Category {
    public func compare(category1 : Category, category2 : Category) : { #less; #equal; #greater } {
      switch (category1, category2) {
        case (#personal, #personal) { #equal };
        case (#personal, _) { #less };
        case (#work, #personal) { #greater };
        case (#work, #work) { #equal };
        case (#work, #academic) { #less };
        case (#academic, #academic) { #equal };
        case (#academic, _) { #greater };
      };
    };
  };

  type Priority = {
    #high;
    #medium;
    #low;
  };

  module Priority {
    public func compare(priority1 : Priority, priority2 : Priority) : { #less; #equal; #greater } {
      switch (priority1, priority2) {
        case (#high, #high) { #equal };
        case (#high, _) { #less };
        case (#medium, #high) { #greater };
        case (#medium, #medium) { #equal };
        case (#medium, #low) { #less };
        case (#low, #low) { #equal };
        case (#low, _) { #greater };
      };
    };
  };

  type Task = {
    id : Nat;
    title : Text;
    category : Category;
    priority : Priority;
    dueDate : ?Text;
    completed : Bool;
    createdAt : Int;
  };

  module Task {
    public func compare(task1 : Task, task2 : Task) : { #less; #equal; #greater } {
      Nat.compare(task1.id, task2.id);
    };
  };

  type TaskInput = {
    title : Text;
    category : Category;
    priority : Priority;
    dueDate : ?Text;
  };

  type Stats = {
    totalTasks : Nat;
    completedTasks : Nat;
  };

  var nextId = 0;

  let tasks = Map.empty<Nat, Task>();

  let quotes = [
    "Believe you can and you're halfway there.",
    "Don't watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started.",
    "Act as if what you do makes a difference. It does.",
    "Quality is not an act, it is a habit.",
    "With the new day comes new strength and new thoughts.",
    "Well done is better than well said.",
    "Don't count the days, make the days count.",
  ];

  func validateId(taskId : Nat) {
    if (taskId >= nextId) { Runtime.trap("Task id " # taskId.toText() # " does not exist") };
  };

  public shared ({ caller }) func createTask(input : TaskInput) : async Task {
    let task : Task = {
      input with
      id = nextId;
      completed = false;
      createdAt = Time.now();
    };
    tasks.add(nextId, task);
    nextId += 1;
    task;
  };

  public query ({ caller }) func getTask(taskId : Nat) : async Task {
    validateId(taskId);
    switch (tasks.get(taskId)) {
      case (null) { Runtime.trap("Task does not exist") };
      case (?task) { task };
    };
  };

  public query ({ caller }) func getAllTasks() : async [Task] {
    tasks.values().toArray().sort();
  };

  public shared ({ caller }) func updateTask(taskId : Nat, input : TaskInput) : async Task {
    validateId(taskId);
    switch (tasks.get(taskId)) {
      case (null) { Runtime.trap("Task does not exist") };
      case (?task) {
        let updatedTask = {
          task with
          title = input.title;
          category = input.category;
          priority = input.priority;
          dueDate = input.dueDate;
        };
        tasks.add(taskId, updatedTask);
        updatedTask;
      };
    };
  };

  public shared ({ caller }) func deleteTask(taskId : Nat) : async () {
    validateId(taskId);
    tasks.remove(taskId);
  };

  public shared ({ caller }) func toggleTaskCompletion(taskId : Nat) : async Task {
    validateId(taskId);
    switch (tasks.get(taskId)) {
      case (null) { Runtime.trap("Task does not exist") };
      case (?task) {
        let updatedTask = {
          task with
          completed = not task.completed;
        };
        tasks.add(taskId, updatedTask);
        updatedTask;
      };
    };
  };

  public query ({ caller }) func getDailyQuote() : async Text {
    let daysSinceEpoch = Time.now() / (24 * 60 * 60 * 1_000_000_000);
    let index = daysSinceEpoch % quotes.size();
    quotes[Int.abs(index)];
  };

  public query ({ caller }) func getTodayStats() : async Stats {
    let todayTimestamp = Time.now() / (24 * 60 * 60 * 1_000_000_000);
    let (total, completed) = tasks.values().foldLeft((0, 0), func((accTotal, accCompleted), task) { let taskTimestamp = task.createdAt / (24 * 60 * 60 * 1_000_000_000); if (taskTimestamp == todayTimestamp) { (accTotal + 1, accCompleted + (if (task.completed) { 1 } else { 0 })) } else { (accTotal, accCompleted) } });
    {
      totalTasks = total;
      completedTasks = completed;
    };
  };
};
