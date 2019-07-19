function createStudent(name, age)
{
	return {
		name : name,
		age : age,
		marks : []
	};
}


function manageStudents(students)
{
	var manager = {

		setStudent : function(name, age){
			students.push(createStudent(name, age));
		},

		deleteStudentByName : function(name){
			
			var index = students.findIndex(function(element, index){
				if(element.name === name){
					return true;
				}

				return false;
			});

			if(index != -1){
				students.splice(index, 1);
			} 
		},

		getStudentByName : function(name){

			var student = students.find(function(element){
				if(element.name === name){
					return element;
				}
			});

			return student ? student : null;
		},

		setMark : function(name, lessonId, mark){
			var student = manager.getStudentByName(name);
			
			if(student){
				student.marks[lessonId] = mark;
			}
		},

		getAverageMarkByName : function(name){
			
			var student = manager.getStudentByName(name);

			if(student){
				var sum = 0;
				var count = 0;

				student.marks.forEach(function(mark){
					sum += mark;
					count++;
				});

				if(sum && count){
					return Math.round(sum / count);
				}
			}

			return null;
		},

		getAverageStudentsMarkByLesson : function(lessonId){
			
			var sum = 0;
			var count = 0;

			students.forEach(function(student){
				if(student.marks[lessonId]){
					sum += student.marks[lessonId];
					count++;
				}
			});

			if(sum && count){
				return Math.round(sum / count);
			}

			return null;
		},

		getStudentsListSortedByName : function(){
			
			return students.sort(function(firstStudent, secondStudent){
				
				if(firstStudent.name < secondStudent.name){
					return 1;
				}else if(firstStudent.name > secondStudent.name){
					return -1;
				}

				return 0;
			});
		},

		getStudentsListSortedByAverageMark : function(){

			return students.sort(function(firstStudent, secondStudent){
				
				var firstStudentAverageMark = manager.getAverageMarkByName(firstStudent.name);
				var secondStudentAverageMark = manager.getAverageMarkByName(secondStudent.name);
		
				if(firstStudentAverageMark < secondStudentAverageMark){
					return 1;
				}else if(firstStudentAverageMark > secondStudentAverageMark){
					return -1;
				}

				return 0;
			});
		}
	};

	return manager;
}

var students = [
	createStudent('Nana', 19),
	createStudent('Alex', 22),
	createStudent('Lola', 21),
	createStudent('Kolya', 18)
];

var manager = manageStudents(students);

// добавляем студентов
manager.setStudent('Ulya', 20);
manager.setStudent('Irina', 25);
manager.setStudent('Vlad', 24);

// ставим оценки
manager.setMark('Nana', 1, 10);
manager.setMark('Nana', 2, 8);

manager.setMark('Ulya', 1, 9);
manager.setMark('Ulya', 2, 4);

manager.setMark('Alex', 1, 9);
manager.setMark('Alex', 2, 10);

manager.setMark('Kolya', 1, 8);

manager.setMark('Lola', 1, 3);
manager.setMark('Lola', 2, 10);

manager.setMark('Vlad', 1, 10);
manager.setMark('Vlad', 2, 10);

manager.setMark('Irina', 1, 6);
manager.setMark('Irina', 2, 8);

//изначальный массив 
console.log(students);

// получаем студента
console.log(manager.getStudentByName('Irina'));

// средний бал студента по имени
console.log(manager.getAverageMarkByName('Irina'))

// средняя оценка группы за занятие номер 1
console.log(manager.getAverageStudentsMarkByLesson(1));

// удаляем студента
manager.deleteStudentByName('Irina');

// список после удаления
console.log(students);

// средняя оценка группы за занятие номер 1 после удаления студента
console.log(manager.getAverageStudentsMarkByLesson(1));

// список студентов отсортированный по имени
console.log(manager.getStudentsListSortedByName());

// список студентов отсортированный по среднему баллу
console.log(manager.getStudentsListSortedByAverageMark());

