Assignment 2 - Quiz Portal

- Run backend using Backend.go in go/src
- Run using yarn in react-app/src

1: Used Go-Lang for backend purposes on port 8080.
2: Used React-JS for fronted on port 3000.
3: Minimalistic Quiz Portal with options such as
	Give Quiz -> Give a quiz
	View Stats -> See which quizzes you have given and what your score has been in them
	Leader Board -> See category wise and overall top scorers.
4. For Authentication purposes I have used Auth0.
5. Admin User (here "devesh vijaywargiya") has special options such as:
	Make a new Quiz -> Select Category and give a name to the quiz and then enter the details.
	Make a new category -> Define a new category for new Quizzes.
	Delete Quiz -> Delete a quiz corresponding to a given Category and Name.
	View Quiz -> See the Quiz corresponding to a given Category and Name.
	Edit Quiz -> Can be used to modify questions, answers and any links corresponding to each question.
6. Every quiz will have 5 questions.
7. There can be multiple correct questions.
8. Image identification questions can be added.
9. You can give a quiz only once, i.e. your score will not get updated if you give the quiz again.