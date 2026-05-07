import { Code2, Play, CheckCircle, Gamepad2, Calculator, Package, Trophy, TrendingUp, LogIn, UserPlus, X, Lightbulb, Clock, Shield, Trash2, Ban, LogOut, User, Bell, Settings, Edit, Timer, Eye, Save, Plus, Search, Activity, FileText } from "lucide-react";
import { useState, useEffect } from "react";

// Tipos
interface User {
  username: string;
  password: string;
  fullName: string;
  birthDate: string;
  email: string;
  createdAt: string;
}

interface Admin {
  username: string;
  password: string;
  fullName: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface LoginLog {
  username: string;
  timestamp: string;
  ipAddress: string;
  status: 'success' | 'failed' | 'suspicious';
}

interface SolutionExample {
  id: number;
  exerciseName: string;
  language: string;
  code: string;
  explanation: string;
  approved: boolean;
}

interface Course {
  id: number;
  name: string;
  level: string;
  exercises: number;
  students: number;
  color: string;
}

interface Exercise {
  id: number;
  name: string;
  language: string;
  users: number;
  reports: number;
  status: string;
}

interface UserProfile {
  name: string;
  email: string;
  status: string;
  exercises: number;
  lastLogin: string;
}

export default function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Estados de autenticación
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);

  // Nuevos estados para HU-17, HU-18, HU-19, HU-20
  const [showUserHistoryModal, setShowUserHistoryModal] = useState(false);
  const [selectedUserForHistory, setSelectedUserForHistory] = useState<string | null>(null);
  const [showSolutionsManagementModal, setShowSolutionsManagementModal] = useState(false);
  const [showNotificationConfigModal, setShowNotificationConfigModal] = useState(false);
  const [showLoginLogsModal, setShowLoginLogsModal] = useState(false);

  // Nuevos estados para HU-07, HU-08, HU-21, HU-22, HU-23, HU-24
  const [showSpeedPracticeModal, setShowSpeedPracticeModal] = useState(false);
  const [showAISuggestionsModal, setShowAISuggestionsModal] = useState(false);
  const [showTimeReportsModal, setShowTimeReportsModal] = useState(false);
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showCourseManagementModal, setShowCourseManagementModal] = useState(false);
  const [showPlatformStatusModal, setShowPlatformStatusModal] = useState(false);
  const [speedCode, setSpeedCode] = useState("");
  const [speedTimer, setSpeedTimer] = useState(0);
  const [isSpeedTimerRunning, setIsSpeedTimerRunning] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");

  // Nuevos estados para HU-25, HU-26, HU-27, HU-28, HU-29, HU-30
  const [showCodeImprovementModal, setShowCodeImprovementModal] = useState(false);
  const [showRetryExerciseModal, setShowRetryExerciseModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showPausedExercisesModal, setShowPausedExercisesModal] = useState(false);
  const [showDeleteExercisesModal, setShowDeleteExercisesModal] = useState(false);
  const [showSystemAlertsModal, setShowSystemAlertsModal] = useState(false);
  const [currentExerciseCode, setCurrentExerciseCode] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [pausedExercises, setPausedExercises] = useState<any[]>([]);

  // Estados para interacciones realistas
  const [users, setUsers] = useState<UserProfile[]>([
    { name: "Carlos Mendoza", email: "carlos@email.com", status: "active", exercises: 45, lastLogin: "21/03/2026" },
    { name: "Ana García", email: "ana@email.com", status: "active", exercises: 32, lastLogin: "20/03/2026" },
    { name: "Luis Rodríguez", email: "luis@email.com", status: "blocked", exercises: 12, lastLogin: "15/03/2026" },
    { name: "María López", email: "maria@email.com", status: "active", exercises: 67, lastLogin: "21/03/2026" },
    { name: "Pedro Sánchez", email: "pedro@email.com", status: "active", exercises: 28, lastLogin: "19/03/2026" },
  ]);

  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Fundamentos de Python", level: "Principiante", exercises: 25, students: 45, color: "green" },
    { id: 2, name: "JavaScript Intermedio", level: "Intermedio", exercises: 18, students: 32, color: "yellow" },
    { id: 3, name: "Algoritmos Avanzados", level: "Avanzado", exercises: 15, students: 12, color: "red" },
    { id: 4, name: "Estructuras de Datos", level: "Intermedio", exercises: 22, students: 28, color: "yellow" },
    { id: 5, name: "POO en Java", level: "Avanzado", exercises: 20, students: 18, color: "red" },
    { id: 6, name: "Web con React", level: "Intermedio", exercises: 30, students: 35, color: "yellow" },
  ]);

  const [exercisesToDelete, setExercisesToDelete] = useState<Exercise[]>([
    { id: 1, name: "Bucle For antiguo (deprecated)", language: "Python", users: 5, reports: 8, status: "obsolete" },
    { id: 2, name: "Variables sin sentido", language: "JavaScript", users: 2, reports: 12, status: "bad-design" },
    { id: 3, name: "Ejercicio duplicado de arrays", language: "Java", users: 3, reports: 6, status: "duplicate" },
    { id: 4, name: "Condicionales mal explicados", language: "Python", users: 8, reports: 15, status: "bad-design" },
  ]);

  const [editingCourse, setEditingCourse] = useState<number | null>(null);
  const [editingCourseName, setEditingCourseName] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [deletingUser, setDeletingUser] = useState<string | null>(null);
  const [codeApplied, setCodeApplied] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [runningCode, setRunningCode] = useState(false);
  const [codeRun, setCodeRun] = useState(false);

  // Estados para funcionalidades completas
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showAddSolutionModal, setShowAddSolutionModal] = useState(false);
  const [showAssignCourseModal, setShowAssignCourseModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Estados para formularios de creación
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseLevel, setNewCourseLevel] = useState("Principiante");
  const [newCourseExercises, setNewCourseExercises] = useState(0);
  const [selectedCourseToAssign, setSelectedCourseToAssign] = useState("");
  const [selectedStudentToAssign, setSelectedStudentToAssign] = useState("");

  // Estados para gestión de soluciones
  const [solutions, setSolutions] = useState([
    { id: 1, exercise: "Bucle For básico", language: "Python", approved: true, lastEdit: "10/04/2026", code: "for i in range(5):\n    print(i)" },
    { id: 2, exercise: "Condicionales if-else", language: "JavaScript", approved: true, lastEdit: "09/04/2026", code: "if (x > 0) {\n    console.log('Positivo');\n}" },
    { id: 3, exercise: "Funciones recursivas", language: "Java", approved: false, lastEdit: "08/04/2026", code: "public int factorial(int n) {\n    return n <= 1 ? 1 : n * factorial(n-1);\n}" },
    { id: 4, exercise: "Arrays y listas", language: "Python", approved: true, lastEdit: "07/04/2026", code: "numeros = [1, 2, 3, 4, 5]\nprint(numeros)" },
    { id: 5, exercise: "Objetos en JS", language: "JavaScript", approved: false, lastEdit: "06/04/2026", code: "const persona = {\n    nombre: 'Juan',\n    edad: 25\n};" },
  ]);
  const [editingSolution, setEditingSolution] = useState<number | null>(null);
  const [editingSolutionCode, setEditingSolutionCode] = useState("");

  // Estados para alertas del sistema
  const [systemAlerts, setSystemAlerts] = useState([
    { id: 1, severity: "critical", service: "Base de Datos", message: "Tiempo de respuesta superior a 500ms detectado", time: "Hace 5 min", status: "active" },
    { id: 2, severity: "critical", service: "API de Ejercicios", message: "Tasa de error superior al 5% en las últimas peticiones", time: "Hace 12 min", status: "active" },
    { id: 3, severity: "warning", service: "Sistema de Archivos", message: "Espacio en disco al 85% de capacidad", time: "Hace 23 min", status: "active" },
    { id: 4, severity: "warning", service: "Servidor de Autenticación", message: "Picos de tráfico inusuales detectados", time: "Hace 45 min", status: "investigating" },
  ]);

  // Estado para el cronómetro de ejercicios (HU-15)
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Estados del formulario de login
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [authPage, setAuthPage] = useState<"login" | "register">("login");
  
  // Estados del formulario de login admin
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  
  // Estados del formulario de registro
  const [registerFullName, setRegisterFullName] = useState("");
  const [registerBirthDate, setRegisterBirthDate] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  // Cargar usuario actual al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const savedAdmin = localStorage.getItem('currentAdmin');
    if (savedAdmin) {
      setCurrentAdmin(JSON.parse(savedAdmin));
    }

    // Crear admin por defecto si no existe
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    if (admins.length === 0) {
      const defaultAdmin: Admin = {
        username: 'admin',
        password: 'admin123',
        fullName: 'Administrador'
      };
      localStorage.setItem('admins', JSON.stringify([defaultAdmin]));
    }
  }, []);

  // Efecto del cronómetro de ejercicios (HU-15)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setExerciseTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Efecto del cronómetro de velocidad (HU-07)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSpeedTimerRunning) {
      interval = setInterval(() => {
        setSpeedTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSpeedTimerRunning]);

  // Simular notificación de nuevo nivel (HU-14) - visual solamente
  const addLevelUpNotification = () => {
    const newNotification: Notification = {
      id: Date.now(),
      message: '¡Felicitaciones! Has alcanzado el nivel Intermedio',
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);

    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  // Función para formatear el tiempo del cronómetro
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Funciones de autenticación
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginUsername || !loginPassword) {
      setLoginError("Por favor ingresa usuario y contraseña");
      return;
    }

    const storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = storedUsers.find(
      (user) => user.username === loginUsername && user.password === loginPassword
    );

    if (!foundUser) {
      setLoginError("Usuario o contraseña incorrectos");
      return;
    }

    setCurrentUser(foundUser);
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    setShowLoginModal(false);
    setLoginUsername("");
    setLoginPassword("");
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminUsername || !adminPassword) {
      return;
    }

    if (adminUsername !== 'admin' || adminPassword !== 'admin123') {
      return;
    }

    const admin: Admin = {
      username: 'admin',
      password: 'admin123',
      fullName: 'Administrador'
    };

    setCurrentAdmin(admin);
    localStorage.setItem('currentAdmin', JSON.stringify(admin));
    setShowAdminLoginModal(false);
    setAdminUsername("");
    setAdminPassword("");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");

    // Validaciones
    if (!registerFullName || !registerBirthDate || !registerEmail || !registerUsername || !registerPassword) {
      setRegisterError("Por favor completa todos los campos");
      return;
    }

    if (registerPassword.length < 6) {
      setRegisterError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar si el usuario ya existe
    const userExists = users.some((u: User) => u.username === registerUsername || u.email === registerEmail);
    if (userExists) {
      setRegisterError("El usuario o correo electrónico ya está registrado");
      return;
    }

    // Crear nuevo usuario
    const newUser: User = {
      username: registerUsername,
      password: registerPassword,
      fullName: registerFullName,
      birthDate: registerBirthDate,
      email: registerEmail,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setRegisterSuccess("¡Cuenta creada exitosamente! Ahora puedes iniciar sesión");
    
    // Limpiar formulario y regresar a login
    setTimeout(() => {
      setRegisterFullName("");
      setRegisterBirthDate("");
      setRegisterEmail("");
      setRegisterUsername("");
      setRegisterPassword("");
      setRegisterSuccess("");
      setAuthPage("login");
    }, 2000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const handleAdminLogout = () => {
    setCurrentAdmin(null);
    localStorage.removeItem('currentAdmin');
  };

  // Función para pausar ejercicio (HU-28)
  const handlePauseExercise = () => {
    const pausedExercise = {
      id: Date.now(),
      name: "Bucle For básico",
      code: currentExerciseCode,
      timer: exerciseTimer,
      pausedAt: new Date().toISOString()
    };
    setPausedExercises(prev => [...prev, pausedExercise]);
    setIsPaused(true);
    setIsTimerRunning(false);

    const newNotification: Notification = {
      id: Date.now(),
      message: 'Ejercicio pausado. Puedes retomarlo cuando quieras.',
      type: 'info'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  // Funciones para interacciones realistas
  const handleDeleteUser = (userName: string) => {
    setUsers(prev => prev.filter(u => u.name !== userName));
    setDeletingUser(null);

    const newNotification: Notification = {
      id: Date.now(),
      message: `Usuario ${userName} eliminado exitosamente`,
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleToggleUserStatus = (userName: string) => {
    setUsers(prev => prev.map(u =>
      u.name === userName
        ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' }
        : u
    ));

    const user = users.find(u => u.name === userName);
    const newNotification: Notification = {
      id: Date.now(),
      message: `Usuario ${userName} ${user?.status === 'active' ? 'bloqueado' : 'desbloqueado'} exitosamente`,
      type: 'warning'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleDeleteCourse = (courseId: number) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    setShowDeleteConfirm(null);

    const newNotification: Notification = {
      id: Date.now(),
      message: 'Curso eliminado exitosamente',
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleStartEditCourse = (course: Course) => {
    setEditingCourse(course.id);
    setEditingCourseName(course.name);
  };

  const handleSaveEditCourse = (courseId: number) => {
    setCourses(prev => prev.map(c =>
      c.id === courseId ? { ...c, name: editingCourseName } : c
    ));
    setEditingCourse(null);
    setEditingCourseName("");

    const newNotification: Notification = {
      id: Date.now(),
      message: 'Curso actualizado exitosamente',
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleDeleteExercise = (exerciseId: number) => {
    setExercisesToDelete(prev => prev.filter(e => e.id !== exerciseId));

    const newNotification: Notification = {
      id: Date.now(),
      message: 'Ejercicio eliminado exitosamente',
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleApplyCodeImprovements = () => {
    setCurrentExerciseCode("for numero in range(5):\n    print(numero)");
    setCodeApplied(true);

    const newNotification: Notification = {
      id: Date.now(),
      message: 'Mejoras aplicadas exitosamente al código',
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);

    setTimeout(() => {
      setShowCodeImprovementModal(false);
      setCodeApplied(false);
    }, 1500);
  };

  const handleContinuePausedExercise = (exerciseId: number) => {
    const exercise = pausedExercises.find(e => e.id === exerciseId);
    if (exercise) {
      setCurrentExerciseCode(exercise.code);
      setExerciseTimer(exercise.timer);
      setShowPausedExercisesModal(false);
      setIsTimerRunning(true);

      const newNotification: Notification = {
        id: Date.now(),
        message: `Continuando ejercicio: ${exercise.name}`,
        type: 'info'
      };
      setNotifications(prev => [...prev, newNotification]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
    }
  };

  const handleVerifyCode = () => {
    setVerifyingCode(true);
    setCodeVerified(false);

    setTimeout(() => {
      setVerifyingCode(false);
      setCodeVerified(true);

      const isCorrect = currentExerciseCode.includes(':');
      const newNotification: Notification = {
        id: Date.now(),
        message: isCorrect ? '¡Código correcto! Sintaxis verificada exitosamente' : 'Error de sintaxis detectado. Revisa el código',
        type: isCorrect ? 'success' : 'warning'
      };
      setNotifications(prev => [...prev, newNotification]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);

      setTimeout(() => {
        setCodeVerified(false);
      }, 3000);
    }, 1500);
  };

  const handleRunCode = () => {
    setRunningCode(true);
    setCodeRun(false);

    setTimeout(() => {
      setRunningCode(false);
      setCodeRun(true);

      const newNotification: Notification = {
        id: Date.now(),
        message: '¡Código ejecutado exitosamente!',
        type: 'success'
      };
      setNotifications(prev => [...prev, newNotification]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);

      setTimeout(() => {
        setCodeRun(false);
      }, 3000);
    }, 2000);
  };

  const handleNotifyLevelUp = () => {
    addLevelUpNotification();
  };

  // Funciones para agregar nuevos elementos
  const handleAddUser = () => {
    if (!newUserName || !newUserEmail) {
      const newNotification: Notification = {
        id: Date.now(),
        message: 'Por favor completa todos los campos',
        type: 'warning'
      };
      setNotifications(prev => [...prev, newNotification]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
      return;
    }

    const newUser: UserProfile = {
      name: newUserName,
      email: newUserEmail,
      status: "active",
      exercises: 0,
      lastLogin: new Date().toLocaleDateString()
    };

    setUsers(prev => [...prev, newUser]);
    setNewUserName("");
    setNewUserEmail("");
    setShowAddUserModal(false);

    const newNotification: Notification = {
      id: Date.now(),
      message: `Usuario ${newUserName} agregado exitosamente`,
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleAddCourse = () => {
    if (!newCourseName || newCourseExercises <= 0) {
      const newNotification: Notification = {
        id: Date.now(),
        message: 'Por favor completa todos los campos correctamente',
        type: 'warning'
      };
      setNotifications(prev => [...prev, newNotification]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
      return;
    }

    const newCourse: Course = {
      id: Date.now(),
      name: newCourseName,
      level: newCourseLevel,
      exercises: newCourseExercises,
      students: 0,
      color: newCourseLevel === "Principiante" ? "green" : newCourseLevel === "Intermedio" ? "yellow" : "red"
    };

    setCourses(prev => [...prev, newCourse]);
    setNewCourseName("");
    setNewCourseExercises(0);
    setShowAddCourseModal(false);

    const newNotification: Notification = {
      id: Date.now(),
      message: `Curso "${newCourseName}" creado exitosamente`,
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleAssignCourse = () => {
    if (!selectedCourseToAssign || !selectedStudentToAssign) {
      const newNotification: Notification = {
        id: Date.now(),
        message: 'Por favor selecciona un curso y un estudiante',
        type: 'warning'
      };
      setNotifications(prev => [...prev, newNotification]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
      return;
    }

    // Incrementar estudiantes del curso
    setCourses(prev => prev.map(c =>
      c.name === selectedCourseToAssign
        ? { ...c, students: c.students + 1 }
        : c
    ));

    setSelectedCourseToAssign("");
    setSelectedStudentToAssign("");
    setShowAssignCourseModal(false);

    const newNotification: Notification = {
      id: Date.now(),
      message: `Curso asignado exitosamente a ${selectedStudentToAssign}`,
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  // Función de búsqueda dinámica
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredUsers([]);
      setShowSearchResults(false);
      return;
    }

    const results = users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredUsers(results);
    setShowSearchResults(true);
  };

  // Funciones para gestión de soluciones
  const handleApproveSolution = (solutionId: number) => {
    setSolutions(prev => prev.map(s =>
      s.id === solutionId ? { ...s, approved: !s.approved } : s
    ));

    const solution = solutions.find(s => s.id === solutionId);
    const newNotification: Notification = {
      id: Date.now(),
      message: `Solución ${solution?.approved ? 'rechazada' : 'aprobada'} exitosamente`,
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleDeleteSolution = (solutionId: number) => {
    setSolutions(prev => prev.filter(s => s.id !== solutionId));

    const newNotification: Notification = {
      id: Date.now(),
      message: 'Solución eliminada exitosamente',
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleStartEditSolution = (solution: any) => {
    setEditingSolution(solution.id);
    setEditingSolutionCode(solution.code);
  };

  const handleSaveEditSolution = (solutionId: number) => {
    setSolutions(prev => prev.map(s =>
      s.id === solutionId
        ? { ...s, code: editingSolutionCode, lastEdit: new Date().toLocaleDateString() }
        : s
    ));
    setEditingSolution(null);
    setEditingSolutionCode("");

    const newNotification: Notification = {
      id: Date.now(),
      message: 'Solución actualizada exitosamente',
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  // Funciones para alertas del sistema
  const handleResolveAlert = (alertId: number) => {
    setSystemAlerts(prev => prev.map(a =>
      a.id === alertId ? { ...a, status: "resolved" } : a
    ));

    const newNotification: Notification = {
      id: Date.now(),
      message: 'Alerta marcada como resuelta',
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleInvestigateAlert = (alertId: number) => {
    setSystemAlerts(prev => prev.map(a =>
      a.id === alertId ? { ...a, status: "investigating" } : a
    ));

    const newNotification: Notification = {
      id: Date.now(),
      message: 'Alerta marcada como en investigación',
      type: 'info'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleRetryExercise = (exerciseName: string) => {
    setShowRetryExerciseModal(false);

    const newNotification: Notification = {
      id: Date.now(),
      message: `Iniciando ejercicio: ${exerciseName}`,
      type: 'info'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleSubmitSpeedCode = () => {
    if (!speedCode.trim()) {
      const newNotification: Notification = {
        id: Date.now(),
        message: 'Por favor escribe algo de código antes de enviar',
        type: 'warning'
      };
      setNotifications(prev => [...prev, newNotification]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
      return;
    }

    setIsSpeedTimerRunning(false);

    const newNotification: Notification = {
      id: Date.now(),
      message: '¡Código enviado! Tiempo: ' + formatTime(speedTimer),
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);

    setTimeout(() => {
      setShowSpeedPracticeModal(false);
      setSpeedCode("");
      setSpeedTimer(0);
    }, 1500);
  };

  const handleSubmitAIQuestion = () => {
    if (!aiQuestion.trim()) {
      const newNotification: Notification = {
        id: Date.now(),
        message: 'Por favor escribe una pregunta',
        type: 'warning'
      };
      setNotifications(prev => [...prev, newNotification]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
      return;
    }

    const newNotification: Notification = {
      id: Date.now(),
      message: 'Generando respuesta de IA...',
      type: 'info'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleRunPlatformCheck = () => {
    const newNotification: Notification = {
      id: Date.now(),
      message: 'Ejecutando verificación completa del sistema...',
      type: 'info'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 3000);

    setTimeout(() => {
      const successNotification: Notification = {
        id: Date.now(),
        message: '✓ Verificación completada. Todos los servicios operativos',
        type: 'success'
      };
      setNotifications(prev => [...prev, successNotification]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== successNotification.id));
      }, 5000);
    }, 3000);
  };

  const handleSelectLanguage = (language: string) => {
    const newNotification: Notification = {
      id: Date.now(),
      message: `Lenguaje seleccionado: ${language}`,
      type: 'info'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleSelectProject = (project: string) => {
    const newNotification: Notification = {
      id: Date.now(),
      message: `Iniciando proyecto: ${project}`,
      type: 'info'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleSaveNotificationConfig = () => {
    const newNotification: Notification = {
      id: Date.now(),
      message: 'Configuración de notificaciones guardada exitosamente',
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);

    setTimeout(() => {
      setShowNotificationConfigModal(false);
    }, 1500);
  };

  if (!currentUser && !currentAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl rounded-[32px] border border-purple-800/60 bg-gradient-to-br from-purple-950/90 via-black/70 to-black p-8 shadow-2xl shadow-purple-900/40">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-purple-400">Bienvenido a Kick-code</span>
              <h1 className="mt-6 text-4xl font-bold text-white">Iniciar sesión</h1>
              <p className="mt-4 text-sm text-purple-300">Accede con tu cuenta para entrar al panel. Si no tienes cuenta, regístrate aquí.</p>
            </div>

            <div className="rounded-3xl border border-purple-800/60 bg-black/60 p-5 text-right">
              <span className="text-xs uppercase tracking-[0.3em] text-purple-400">Admin</span>
              <p className="mt-2 text-xs text-purple-300">Usuario: admin</p>
              <p className="text-xs text-purple-300">Contraseña: admin123</p>
            </div>
          </div>

          {authPage === "login" ? (
            <form onSubmit={handleLogin} className="mt-10 space-y-5">
              <div>
                <label className="block text-sm text-purple-300 mb-2">Usuario</label>
                <input
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full rounded-2xl border border-purple-800/70 bg-black/70 px-4 py-3 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Contraseña</label>
                <input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full rounded-2xl border border-purple-800/70 bg-black/70 px-4 py-3 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              {loginError && <p className="text-sm text-red-400">{loginError}</p>}

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:from-purple-500 hover:to-purple-600"
              >
                Iniciar sesión
              </button>

              <button
                type="button"
                onClick={() => setAuthPage("register")}
                className="w-full rounded-2xl border border-purple-600 px-6 py-3 text-sm font-semibold text-purple-200 transition hover:bg-purple-900/40"
              >
                Regístrate aquí
              </button>

              <button
                type="button"
                onClick={() => setShowAdminLoginModal(true)}
                className="w-full rounded-2xl bg-black/80 border border-purple-700 px-6 py-3 text-sm font-semibold text-purple-200 transition hover:bg-purple-900/50"
              >
                Iniciar sesión como administrador
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="mt-10 space-y-5">
              <h2 className="text-3xl font-semibold text-white">Crear cuenta</h2>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Nombre completo</label>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={registerFullName}
                  onChange={(e) => setRegisterFullName(e.target.value)}
                  className="w-full rounded-2xl border border-purple-800/70 bg-black/70 px-4 py-3 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Fecha de nacimiento</label>
                <input
                  type="date"
                  value={registerBirthDate}
                  onChange={(e) => setRegisterBirthDate(e.target.value)}
                  className="w-full rounded-2xl border border-purple-800/70 bg-black/70 px-4 py-3 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full rounded-2xl border border-purple-800/70 bg-black/70 px-4 py-3 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Usuario</label>
                <input
                  type="text"
                  placeholder="Elige un nombre de usuario"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className="w-full rounded-2xl border border-purple-800/70 bg-black/70 px-4 py-3 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Contraseña</label>
                <input
                  type="password"
                  placeholder="Crea una contraseña segura"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full rounded-2xl border border-purple-800/70 bg-black/70 px-4 py-3 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              {registerError && <p className="text-sm text-red-400">{registerError}</p>}
              {registerSuccess && <p className="text-sm text-green-400">{registerSuccess}</p>}

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:from-purple-500 hover:to-purple-600"
              >
                Registrarse
              </button>

              <button
                type="button"
                onClick={() => setAuthPage("login")}
                className="w-full rounded-2xl border border-purple-600 px-6 py-3 text-sm font-semibold text-purple-200 transition hover:bg-purple-900/40"
              >
                Volver al inicio de sesión
              </button>
            </form>
          )}

          {showAdminLoginModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-purple-900/50 relative">
                <button 
                  onClick={() => setShowAdminLoginModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-purple-400 mb-6">Iniciar sesión Admin</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Usuario</label>
                    <input 
                      type="text" 
                      placeholder="Ingresa tu usuario"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Contraseña</label>
                    <input 
                      type="password" 
                      placeholder="Ingresa tu contraseña"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                  <button onClick={handleAdminLogin} className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 font-semibold mt-6">
                    Ingresar como admin
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-purple-900/50 bg-gradient-to-r from-black via-purple-950/30 to-black backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Kick-code
              </span>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#inicio" className="hover:text-purple-400 transition-colors">Inicio</a>
              {currentAdmin ? (
                <button onClick={() => setShowCourseManagementModal(true)} className="hover:text-purple-400 transition-colors">
                  Ejercicios
                </button>
              ) : (
                <a href="#ejercicios" className="hover:text-purple-400 transition-colors">Ejercicios</a>
              )}
              <a href="#lenguajes" className="hover:text-purple-400 transition-colors">Lenguajes</a>
              <a href="#proyectos" className="hover:text-purple-400 transition-colors">Proyectos</a>
              <a href="#progreso" className="hover:text-purple-400 transition-colors">Progreso</a>
              
              {/* Botones de autenticación */}
              {currentAdmin ? (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-400">Admin: {currentAdmin.fullName}</span>
                  <button 
                    onClick={handleAdminLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                </div>
              ) : currentUser ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm text-purple-400">{currentUser.username}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 top-10 bg-black/50 border border-purple-800/50 rounded-2xl p-4 shadow-2xl shadow-purple-900/50 z-50">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                      </button>
                      
                      <button 
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                      >
                        <Settings className="w-4 h-4" />
                        Configuración
                      </button>
                      
                      <button 
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                      >
                        <Edit className="w-4 h-4" />
                        Editar perfil
                      </button>
                      
                      <button 
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                      >
                        <Timer className="w-4 h-4" />
                        Tiempo de sesión
                      </button>
                      
                      <button 
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                      >
                        <Bell className="w-4 h-4" />
                        Notificaciones
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                  >
                    <LogIn className="w-4 h-4" />
                    Iniciar sesión
                  </button>
                  <button 
                    onClick={() => setShowRegisterModal(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-purple-600 rounded-lg hover:bg-purple-900/30 transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modal de Iniciar Sesión */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-purple-900/50 relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Iniciar Sesión</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-purple-300 mb-2">Usuario</label>
                <input 
                  type="text" 
                  placeholder="Ingresa tu usuario"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm text-purple-300 mb-2">Contraseña</label>
                <input 
                  type="password" 
                  placeholder="Ingresa tu contraseña"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>
              
              <button onClick={handleLogin} className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 font-semibold mt-6">
                Ingresar
              </button>
              
              {/* Enlace a login de administrador */}
              <div className="mt-4 text-center">
                <button 
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowAdminLoginModal(true);
                  }}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 justify-center w-full"
                >
                  <Shield className="w-4 h-4" />
                  Iniciar sesión como administrador
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Iniciar Sesión Admin */}
      {showAdminLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-purple-900/50 relative">
            <button 
              onClick={() => setShowAdminLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Iniciar Sesión Admin</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-purple-300 mb-2">Usuario</label>
                <input 
                  type="text" 
                  placeholder="Ingresa tu usuario"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm text-purple-300 mb-2">Contraseña</label>
                <input 
                  type="password" 
                  placeholder="Ingresa tu contraseña"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>
              
              <button onClick={handleAdminLogin} className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 font-semibold mt-6">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Registro */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-purple-900/50 relative">
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6">Crear Cuenta</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-purple-300 mb-2">Nombre completo</label>
                <input
                  type="text"
                  placeholder="Ingresa tu nombre completo"
                  value={registerFullName}
                  onChange={(e) => setRegisterFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Fecha de nacimiento</label>
                <input
                  type="date"
                  value={registerBirthDate}
                  onChange={(e) => setRegisterBirthDate(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Usuario</label>
                <input
                  type="text"
                  placeholder="Elige un nombre de usuario"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Contraseña</label>
                <input
                  type="password"
                  placeholder="Crea una contraseña segura"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>

              {registerError && (
                <p className="text-red-400 text-sm mt-2">{registerError}</p>
              )}

              {registerSuccess && (
                <p className="text-green-400 text-sm mt-2">{registerSuccess}</p>
              )}

              <button onClick={handleRegister} className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 font-semibold mt-6">
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notificaciones Popup (HU-14) */}
      <div className="fixed top-20 right-6 z-50 space-y-3">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`bg-gradient-to-br border rounded-2xl p-4 shadow-2xl animate-slide-in-right min-w-[300px] ${
              notification.type === 'success' ? 'from-green-950/90 to-black border-green-800/50' :
              notification.type === 'warning' ? 'from-yellow-950/90 to-black border-yellow-800/50' :
              'from-purple-950/90 to-black border-purple-800/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <Trophy className={`w-6 h-6 ${
                notification.type === 'success' ? 'text-green-400' :
                notification.type === 'warning' ? 'text-yellow-400' :
                'text-purple-400'
              }`} />
              <div className="flex-1">
                <p className={`font-semibold ${
                  notification.type === 'success' ? 'text-green-400' :
                  notification.type === 'warning' ? 'text-yellow-400' :
                  'text-purple-400'
                }`}>
                  {notification.type === 'success' ? '¡Nuevo nivel desbloqueado!' :
                   notification.type === 'warning' ? 'Atención' : 'Información'}
                </p>
                <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Logs de Inicio de Sesión (HU-17) */}
      {showLoginLogsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-5xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowLoginLogsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Registro de Inicios de Sesión
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-800/50">
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Usuario</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Fecha y Hora</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">IP Address</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { username: "Carlos Mendoza", timestamp: "12/04/2026 14:32:15", ipAddress: "192.168.1.45", status: 'success' as const },
                    { username: "Ana García", timestamp: "12/04/2026 13:22:08", ipAddress: "192.168.1.67", status: 'success' as const },
                    { username: "usuario_desconocido", timestamp: "12/04/2026 12:15:33", ipAddress: "45.67.89.12", status: 'failed' as const },
                    { username: "Luis Rodríguez", timestamp: "12/04/2026 11:45:22", ipAddress: "192.168.1.89", status: 'success' as const },
                    { username: "admin_fake", timestamp: "12/04/2026 10:30:11", ipAddress: "123.45.67.89", status: 'suspicious' as const },
                    { username: "María López", timestamp: "12/04/2026 09:18:45", ipAddress: "192.168.1.23", status: 'success' as const },
                    { username: "hacker123", timestamp: "12/04/2026 08:05:19", ipAddress: "78.90.12.34", status: 'suspicious' as const },
                    { username: "Pedro Sánchez", timestamp: "12/04/2026 07:50:02", ipAddress: "192.168.1.56", status: 'success' as const },
                  ].map((log, idx) => (
                    <tr key={idx} className="border-b border-purple-900/30 hover:bg-purple-900/20 transition-colors">
                      <td className="py-4 px-4 text-purple-200">{log.username}</td>
                      <td className="py-4 px-4 text-gray-400">{log.timestamp}</td>
                      <td className="py-4 px-4 text-gray-400 font-mono text-sm">{log.ipAddress}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          log.status === 'success' ? 'bg-green-900/30 text-green-400 border border-green-700/50' :
                          log.status === 'failed' ? 'bg-red-900/30 text-red-400 border border-red-700/50' :
                          'bg-orange-900/30 text-orange-400 border border-orange-700/50'
                        }`}>
                          {log.status === 'success' ? 'Exitoso' : log.status === 'failed' ? 'Fallido' : 'Sospechoso'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-900/30 to-black border border-green-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Accesos exitosos</p>
                <p className="text-3xl font-bold text-green-300">245</p>
              </div>
              <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Accesos fallidos</p>
                <p className="text-3xl font-bold text-red-300">12</p>
              </div>
              <div className="bg-gradient-to-br from-orange-900/30 to-black border border-orange-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Actividad sospechosa</p>
                <p className="text-3xl font-bold text-orange-300">5</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Historial de Usuario (HU-18) */}
      {showUserHistoryModal && selectedUserForHistory && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-4xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowUserHistoryModal(false);
                setSelectedUserForHistory(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-2 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              Historial de {selectedUserForHistory}
            </h2>
            <p className="text-gray-400 text-sm mb-6">Progreso detallado y estadísticas del usuario</p>

            {/* Estadísticas generales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Ejercicios totales</p>
                <p className="text-3xl font-bold text-purple-300">45</p>
              </div>
              <div className="bg-gradient-to-br from-green-900/30 to-black border border-green-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Correctos</p>
                <p className="text-3xl font-bold text-green-300">38</p>
              </div>
              <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Incorrectos</p>
                <p className="text-3xl font-bold text-red-300">7</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Nivel actual</p>
                <p className="text-3xl font-bold text-blue-300">Inter.</p>
              </div>
            </div>

            {/* Historial de ejercicios */}
            <div className="bg-black/50 border border-purple-800/50 rounded-xl p-4 mb-6">
              <h3 className="text-lg font-semibold text-purple-300 mb-4">Actividad reciente</h3>
              <div className="space-y-2">
                {[
                  { exercise: "Bucles For", date: "12/04/2026", time: "2m 15s", status: "correct" },
                  { exercise: "Condicionales if-else", date: "11/04/2026", time: "3m 42s", status: "correct" },
                  { exercise: "Funciones recursivas", date: "10/04/2026", time: "5m 18s", status: "incorrect" },
                  { exercise: "Arrays y listas", date: "09/04/2026", time: "1m 55s", status: "correct" },
                  { exercise: "Objetos en JS", date: "08/04/2026", time: "4m 32s", status: "incorrect" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg hover:bg-purple-900/30 transition-colors">
                    <div className="flex-1">
                      <p className="text-purple-200 font-semibold">{item.exercise}</p>
                      <p className="text-gray-400 text-sm">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-purple-300 text-sm flex items-center gap-1">
                        <Timer className="w-4 h-4" />
                        {item.time}
                      </span>
                      {item.status === "correct" ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Anomalías detectadas */}
            <div className="bg-orange-900/20 border border-orange-700/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-orange-400 mb-3">Anomalías detectadas</h3>
              <div className="space-y-2">
                <p className="text-sm text-orange-200">• Usuario completó 15 ejercicios en menos de 1 minuto cada uno (08/04/2026)</p>
                <p className="text-sm text-orange-200">• Patrón de respuestas similar detectado con usuario "Ana García"</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Gestión de Soluciones (HU-19) */}
      {showSolutionsManagementModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-5xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowSolutionsManagementModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Gestión de Ejemplos de Solución
            </h2>

            <button
              onClick={() => setShowAddSolutionModal(true)}
              className="mb-6 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
            >
              <Plus className="w-4 h-4" />
              Agregar nueva solución
            </button>

            <div className="space-y-4">
              {solutions.length === 0 ? (
                <div className="bg-black/50 border border-purple-800/50 rounded-xl p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">No hay soluciones disponibles</p>
                </div>
              ) : (
                solutions.map((solution) => (
                  <div key={solution.id} className="bg-black/50 border border-purple-800/50 rounded-xl p-5 hover:border-purple-600 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-purple-300">{solution.exercise}</h3>
                          <span className="px-2 py-1 bg-purple-900/30 border border-purple-700/50 rounded text-xs text-purple-300">
                            {solution.language}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            solution.approved
                              ? 'bg-green-900/30 text-green-400 border border-green-700/50'
                              : 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50'
                          }`}>
                            {solution.approved ? 'Aprobado' : 'Pendiente'}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">Última edición: {solution.lastEdit}</p>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        {editingSolution === solution.id ? (
                          <>
                            <button
                              onClick={() => handleSaveEditSolution(solution.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-700/50 rounded-lg hover:bg-green-900/50 transition-all text-green-400 text-sm"
                            >
                              <Save className="w-4 h-4" />
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditingSolution(null)}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg hover:bg-gray-700 transition-all text-white text-sm"
                            >
                              <X className="w-4 h-4" />
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleStartEditSolution(solution)}
                              className="flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-700/50 rounded-lg hover:bg-purple-900/50 transition-all text-purple-300 text-sm"
                            >
                              <Edit className="w-4 h-4" />
                              Editar
                            </button>
                            <button
                              onClick={() => handleApproveSolution(solution.id)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm ${
                                solution.approved
                                  ? 'bg-yellow-900/30 border border-yellow-700/50 hover:bg-yellow-900/50 text-yellow-400'
                                  : 'bg-green-900/30 border border-green-700/50 hover:bg-green-900/50 text-green-400'
                              }`}
                            >
                              <CheckCircle className="w-4 h-4" />
                              {solution.approved ? 'Rechazar' : 'Aprobar'}
                            </button>
                            <button
                              onClick={() => handleDeleteSolution(solution.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-red-900/30 border border-red-700/50 rounded-lg hover:bg-red-900/50 transition-all text-red-400 text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              Eliminar
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Vista previa del código */}
                    <div className="mt-4">
                      {editingSolution === solution.id ? (
                        <textarea
                          value={editingSolutionCode}
                          onChange={(e) => setEditingSolutionCode(e.target.value)}
                          className="w-full h-32 px-4 py-3 bg-black/80 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all font-mono text-sm text-purple-300"
                        />
                      ) : (
                        <div className="bg-black/80 rounded-lg p-4 border border-purple-900/50 font-mono text-sm">
                          <pre className="text-purple-300 whitespace-pre-wrap">{solution.code}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Configuración de Notificaciones (HU-20) */}
      {showNotificationConfigModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-3xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowNotificationConfigModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Configuración de Notificaciones de Nivel
            </h2>

            <div className="space-y-6">
              {/* Nivel Principiante */}
              <div className="bg-black/50 border border-purple-800/50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-green-400 mb-4">Nivel Principiante → Intermedio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Ejercicios completados mínimo</label>
                    <input
                      type="number"
                      defaultValue={20}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Tasa de éxito mínima (%)</label>
                    <input
                      type="number"
                      defaultValue={70}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Tiempo promedio máximo (minutos)</label>
                    <input
                      type="number"
                      defaultValue={5}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Racha mínima (días)</label>
                    <input
                      type="number"
                      defaultValue={7}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Nivel Intermedio */}
              <div className="bg-black/50 border border-purple-800/50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">Nivel Intermedio → Avanzado</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Ejercicios completados mínimo</label>
                    <input
                      type="number"
                      defaultValue={50}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Tasa de éxito mínima (%)</label>
                    <input
                      type="number"
                      defaultValue={85}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Tiempo promedio máximo (minutos)</label>
                    <input
                      type="number"
                      defaultValue={3}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Racha mínima (días)</label>
                    <input
                      type="number"
                      defaultValue={14}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Nivel Avanzado */}
              <div className="bg-black/50 border border-purple-800/50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-4">Nivel Avanzado → Experto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Ejercicios completados mínimo</label>
                    <input
                      type="number"
                      defaultValue={100}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Tasa de éxito mínima (%)</label>
                    <input
                      type="number"
                      defaultValue={95}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Tiempo promedio máximo (minutos)</label>
                    <input
                      type="number"
                      defaultValue={2}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Racha mínima (días)</label>
                    <input
                      type="number"
                      defaultValue={30}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveNotificationConfig}
                className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 font-semibold"
              >
                <Save className="w-5 h-5" />
                Guardar configuración
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Práctica de Velocidad (HU-07) */}
      {showSpeedPracticeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-4xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowSpeedPracticeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Práctica de Velocidad de Programación
            </h2>

            <div className="bg-black/50 border border-purple-800/50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Timer className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Tiempo</p>
                    <p className="text-2xl font-bold text-purple-300 font-mono">{formatTime(speedTimer)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!isSpeedTimerRunning ? (
                    <button
                      onClick={() => setIsSpeedTimerRunning(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-500 hover:to-green-600 transition-all shadow-lg shadow-green-500/50 text-sm"
                    >
                      <Play className="w-4 h-4" />
                      Iniciar
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsSpeedTimerRunning(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg shadow-yellow-500/50 text-sm"
                    >
                      Pausar
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSpeedTimer(0);
                      setIsSpeedTimerRunning(false);
                      setSpeedCode("");
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-500/50 text-sm"
                  >
                    Reiniciar
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-purple-900/30 rounded-lg border border-purple-700/50">
              <p className="text-purple-200 font-semibold mb-2">Desafío: Implementa una función que sume dos números</p>
              <p className="text-gray-400 text-sm">Escribe el código lo más rápido posible sin errores</p>
            </div>

            <textarea
              value={speedCode}
              onChange={(e) => setSpeedCode(e.target.value)}
              placeholder="Escribe tu código aquí..."
              className="w-full h-64 px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all font-mono text-sm text-purple-300"
            />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Caracteres escritos</p>
                <p className="text-3xl font-bold text-purple-300">{speedCode.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-900/30 to-black border border-green-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Velocidad (CPM)</p>
                <p className="text-3xl font-bold text-green-300">
                  {speedTimer > 0 ? Math.round((speedCode.length / speedTimer) * 60) : 0}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Mejor tiempo</p>
                <p className="text-3xl font-bold text-blue-300">45s</p>
              </div>
            </div>

            <button
              onClick={handleSubmitSpeedCode}
              className="w-full mt-6 flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 font-semibold"
            >
              <CheckCircle className="w-5 h-5" />
              Verificar y enviar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Sugerencias con IA (HU-08) */}
      {showAISuggestionsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-3xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowAISuggestionsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6" />
              Asistente de IA - Aclara tus dudas
            </h2>

            <div className="mb-6">
              <label className="block text-sm text-purple-300 mb-2">Escribe tu pregunta o duda</label>
              <textarea
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Ej: ¿Cómo funciona un bucle for en Python?"
                className="w-full h-32 px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all text-purple-200"
              />
            </div>

            <button
              onClick={handleSubmitAIQuestion}
              className="w-full mb-6 flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 font-semibold"
            >
              <Lightbulb className="w-5 h-5" />
              Obtener sugerencia
            </button>

            {aiQuestion && (
              <div className="bg-gradient-to-br from-green-950/50 to-black border border-green-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5" />
                  Sugerencia de IA
                </h3>

                <div className="bg-black/50 border border-green-700/50 rounded-lg p-4 mb-4">
                  <p className="text-green-200 text-sm leading-relaxed">
                    Un bucle <code className="bg-green-900/30 px-2 py-1 rounded text-green-300">for</code> en Python te permite iterar sobre una secuencia (como una lista, tupla o rango). La sintaxis básica es:
                  </p>
                </div>

                <div className="bg-black/80 rounded-xl p-4 border border-green-900/50 font-mono text-sm mb-4">
                  <div className="text-green-400">for elemento in secuencia:</div>
                  <div className="text-purple-300 ml-4">    # código a ejecutar</div>
                </div>

                <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                  <p className="text-green-300 font-semibold mb-2">Ejemplo práctico:</p>
                  <div className="bg-black/50 rounded-lg p-3 font-mono text-sm">
                    <div className="text-green-400">for i in range(5):</div>
                    <div className="text-purple-300 ml-4">    print(i)</div>
                    <div className="text-gray-500 mt-2"># Imprime: 0, 1, 2, 3, 4</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Reportes de Tiempo (HU-21) */}
      {showTimeReportsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-5xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowTimeReportsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Reportes de Tiempo Promedio
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Tiempo promedio general</p>
                <p className="text-3xl font-bold text-purple-300">3m 42s</p>
              </div>
              <div className="bg-gradient-to-br from-green-900/30 to-black border border-green-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Ejercicios completados</p>
                <p className="text-3xl font-bold text-green-300">1,245</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Usuarios activos</p>
                <p className="text-3xl font-bold text-blue-300">156</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-800/50">
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Ejercicio</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Dificultad</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Tiempo Promedio</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Intentos Prom.</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Tasa Éxito</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { exercise: "Bucle For básico", difficulty: "Fácil", avgTime: "2m 15s", avgAttempts: 1.3, successRate: "95%" },
                    { exercise: "Condicionales if-else", difficulty: "Fácil", avgTime: "3m 42s", avgAttempts: 1.8, successRate: "89%" },
                    { exercise: "Funciones recursivas", difficulty: "Difícil", avgTime: "8m 23s", avgAttempts: 3.5, successRate: "67%" },
                    { exercise: "Arrays y listas", difficulty: "Medio", avgTime: "4m 18s", avgAttempts: 2.1, successRate: "82%" },
                    { exercise: "Bucles anidados", difficulty: "Difícil", avgTime: "7m 45s", avgAttempts: 3.2, successRate: "71%" },
                    { exercise: "Manejo de strings", difficulty: "Medio", avgTime: "3m 55s", avgAttempts: 1.9, successRate: "86%" },
                  ].map((item, idx) => (
                    <tr key={idx} className="border-b border-purple-900/30 hover:bg-purple-900/20 transition-colors">
                      <td className="py-4 px-4 text-purple-200">{item.exercise}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.difficulty === 'Fácil' ? 'bg-green-900/30 text-green-400 border border-green-700/50' :
                          item.difficulty === 'Medio' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50' :
                          'bg-red-900/30 text-red-400 border border-red-700/50'
                        }`}>
                          {item.difficulty}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-purple-300 flex items-center gap-1">
                        <Timer className="w-4 h-4" />
                        {item.avgTime}
                      </td>
                      <td className="py-4 px-4 text-gray-400">{item.avgAttempts}</td>
                      <td className="py-4 px-4">
                        <span className={`font-semibold ${
                          parseFloat(item.successRate) >= 85 ? 'text-green-400' :
                          parseFloat(item.successRate) >= 70 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {item.successRate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Explicaciones Teóricas (HU-22) */}
      {showTheoryModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-4xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowTheoryModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Explicaciones Teóricas - Bucles
            </h2>

            <div className="space-y-6">
              <div className="bg-black/50 border border-purple-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-purple-300 mb-4">¿Qué son los bucles?</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Los bucles son estructuras de control que permiten ejecutar un bloque de código repetidamente mientras se cumpla una condición específica o para cada elemento en una secuencia.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Son fundamentales en programación porque nos permiten automatizar tareas repetitivas y procesar colecciones de datos de manera eficiente.
                </p>
              </div>

              <div className="bg-black/50 border border-purple-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-purple-300 mb-4">Tipos de bucles en Python</h3>

                <div className="space-y-4">
                  <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-purple-400 mb-2">1. Bucle FOR</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Se utiliza para iterar sobre una secuencia (lista, tupla, string, rango).
                    </p>
                    <div className="bg-black/80 rounded-lg p-4 border border-purple-900/50 font-mono text-sm">
                      <div className="text-purple-400">for i in range(5):</div>
                      <div className="text-gray-300 ml-4">    print(i)</div>
                      <div className="text-gray-500 mt-2"># Salida: 0, 1, 2, 3, 4</div>
                    </div>
                  </div>

                  <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-purple-400 mb-2">2. Bucle WHILE</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Se ejecuta mientras una condición sea verdadera.
                    </p>
                    <div className="bg-black/80 rounded-lg p-4 border border-purple-900/50 font-mono text-sm">
                      <div className="text-purple-400">contador = 0</div>
                      <div className="text-purple-400">while contador &lt; 5:</div>
                      <div className="text-gray-300 ml-4">    print(contador)</div>
                      <div className="text-gray-300 ml-4">    contador += 1</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-950/50 to-black border border-green-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">Buenas prácticas</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Asegúrate de que el bucle tenga una condición de salida clara para evitar bucles infinitos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Usa nombres de variables descriptivos para los contadores e iteradores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Prefiere bucles FOR cuando sepas el número de iteraciones de antemano</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Usa bucles WHILE cuando la condición de salida dependa de un evento o estado</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-900/20 border border-orange-700/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-orange-400 mb-4">Errores comunes</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>Olvidar los dos puntos (:) al final de la declaración del bucle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>No incrementar el contador en bucles WHILE (causando bucles infinitos)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>Errores de indentación dentro del cuerpo del bucle</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Gestión de Cursos (HU-23) */}
      {showCourseManagementModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-6xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowCourseManagementModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Package className="w-6 h-6" />
              Gestión de Cursos y Ejercicios
            </h2>

            <div className="mb-6 flex gap-4">
              <button
                onClick={() => setShowAddCourseModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
              >
                <Plus className="w-4 h-4" />
                Crear nuevo curso
              </button>
              <button
                onClick={() => setShowAssignCourseModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-500 hover:to-green-600 transition-all shadow-lg shadow-green-500/50"
              >
                <CheckCircle className="w-4 h-4" />
                Asignar curso
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-black/50 border border-purple-800/50 rounded-xl p-5 hover:border-purple-600 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    {editingCourse === course.id ? (
                      <input
                        type="text"
                        value={editingCourseName}
                        onChange={(e) => setEditingCourseName(e.target.value)}
                        className="flex-1 mr-2 px-3 py-2 bg-black/50 border border-purple-600 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all text-purple-300"
                        autoFocus
                      />
                    ) : (
                      <h3 className="text-lg font-semibold text-purple-300">{course.name}</h3>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                      course.color === 'green' ? 'bg-green-900/30 text-green-400 border border-green-700/50' :
                      course.color === 'yellow' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50' :
                      'bg-red-900/30 text-red-400 border border-red-700/50'
                    }`}>
                      {course.level}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Ejercicios:</span>
                      <span className="text-purple-300 font-semibold">{course.exercises}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Estudiantes:</span>
                      <span className="text-purple-300 font-semibold">{course.students}</span>
                    </div>
                  </div>

                  {showDeleteConfirm === course.id ? (
                    <div className="space-y-2">
                      <p className="text-red-300 text-sm text-center">¿Confirmar eliminación?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-600 border border-red-500 rounded-lg hover:bg-red-700 transition-all text-white text-sm font-semibold"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Sí
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg hover:bg-gray-700 transition-all text-white text-sm"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  ) : editingCourse === course.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEditCourse(course.id)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-900/30 border border-green-700/50 rounded-lg hover:bg-green-900/50 transition-all text-green-400 text-sm"
                      >
                        <Save className="w-4 h-4" />
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingCourse(null)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg hover:bg-gray-700 transition-all text-white text-sm"
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartEditCourse(course)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-900/30 border border-purple-700/50 rounded-lg hover:bg-purple-900/50 transition-all text-purple-300 text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(course.id)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-900/30 border border-red-700/50 rounded-lg hover:bg-red-900/50 transition-all text-red-400 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Estado de la Plataforma (HU-24) */}
      {showPlatformStatusModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-5xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowPlatformStatusModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Estado de la Plataforma
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-900/30 to-black border border-green-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Estado General</p>
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-green-300">Operativo</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Uptime</p>
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-blue-300">99.9%</p>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Usuarios en línea</p>
                  <User className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-purple-300">87</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-300">Servicios</h3>

              {[
                { service: "Servidor de Ejercicios", status: "operational", response: "45ms", lastCheck: "Hace 2 min" },
                { service: "Base de Datos", status: "operational", response: "12ms", lastCheck: "Hace 1 min" },
                { service: "Sistema de Autenticación", status: "operational", response: "23ms", lastCheck: "Hace 3 min" },
                { service: "API de Sugerencias IA", status: "operational", response: "156ms", lastCheck: "Hace 5 min" },
                { service: "Servicio de Notificaciones", status: "operational", response: "34ms", lastCheck: "Hace 4 min" },
                { service: "Sistema de Archivos", status: "operational", response: "18ms", lastCheck: "Hace 2 min" },
              ].map((item, idx) => (
                <div key={idx} className="bg-black/50 border border-purple-800/50 rounded-xl p-4 hover:border-purple-600 transition-all">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <h4 className="text-purple-200 font-semibold">{item.service}</h4>
                        <p className="text-gray-400 text-xs">{item.lastCheck}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Tiempo de respuesta</p>
                        <p className="text-green-300 font-semibold">{item.response}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-900/30 text-green-400 border border-green-700/50">
                        Operativo
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-purple-900/20 border border-purple-700/50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 font-semibold">Última verificación completa</p>
                  <p className="text-gray-400 text-sm">13 de Abril, 2026 - 14:35:22</p>
                </div>
                <button
                  onClick={handleRunPlatformCheck}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                >
                  <Activity className="w-4 h-4" />
                  Ejecutar verificación
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Mejora de Código (HU-25) */}
      {showCodeImprovementModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-4xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowCodeImprovementModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6" />
              Sugerencias para Mejorar tu Código
            </h2>

            <div className="mb-6 bg-black/50 border border-purple-800/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">Tu código actual:</h3>
              <div className="bg-black/80 rounded-lg p-4 border border-purple-900/50 font-mono text-sm">
                <div className="text-red-400">for i in range(5)</div>
                <div className="text-purple-300">    print(i)</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-orange-950/50 to-black border border-orange-800/50 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Bell className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-orange-400 mb-2">Error de sintaxis detectado</h3>
                    <p className="text-orange-200 text-sm">Falta el símbolo de dos puntos (:) al final de la declaración del bucle</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-950/50 to-black border border-blue-800/50 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Sugerencia de mejora</h3>
                    <p className="text-blue-200 text-sm mb-3">Considera usar nombres de variables más descriptivos en lugar de 'i'</p>
                    <div className="bg-black/80 rounded-lg p-4 border border-blue-900/50 font-mono text-sm">
                      <div className="text-blue-400">for numero in range(5):</div>
                      <div className="text-purple-300">    print(numero)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-950/50 to-black border border-green-800/50 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-400 mb-2">Buenas prácticas aplicadas</h3>
                    <ul className="space-y-2 text-green-200 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>Buen uso de la indentación (4 espacios)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>Uso apropiado de la función range()</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Código optimizado sugerido:</h3>
                <div className="bg-black/80 rounded-lg p-4 border border-purple-900/50 font-mono text-sm mb-3">
                  <div className="text-green-400">for numero in range(5):</div>
                  <div className="text-purple-300">    print(numero)</div>
                </div>
                <p className="text-gray-400 text-sm">Este código sigue las mejores prácticas de Python y es más legible.</p>
              </div>
            </div>

            <button
              onClick={handleApplyCodeImprovements}
              disabled={codeApplied}
              className={`w-full mt-6 flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r rounded-lg transition-all shadow-lg font-semibold ${
                codeApplied
                  ? 'from-green-600 to-green-700 shadow-green-500/50'
                  : 'from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 shadow-purple-500/50 hover:shadow-purple-500/70'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              {codeApplied ? '¡Mejoras aplicadas!' : 'Aplicar sugerencias y continuar'}
            </button>
          </div>
        </div>
      )}

      {/* Modal de Repetir Ejercicio (HU-26) */}
      {showRetryExerciseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-3xl w-full shadow-2xl shadow-purple-900/50 relative">
            <button
              onClick={() => setShowRetryExerciseModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Play className="w-6 h-6" />
              Ejercicios Fallidos - Intentar de Nuevo
            </h2>

            <p className="text-purple-200 mb-6">Repite estos ejercicios para mejorar tu comprensión</p>

            <div className="space-y-4">
              {[
                { name: "Funciones recursivas", attempts: 3, lastAttempt: "19/03/2026", difficulty: "Difícil" },
                { name: "Bucles anidados", attempts: 4, lastAttempt: "17/03/2026", difficulty: "Difícil" },
                { name: "Manejo de excepciones", attempts: 2, lastAttempt: "15/03/2026", difficulty: "Medio" },
              ].map((exercise, idx) => (
                <div key={idx} className="bg-black/50 border border-purple-800/50 rounded-xl p-5 hover:border-purple-600 transition-all">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-purple-300">{exercise.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          exercise.difficulty === 'Difícil' ? 'bg-red-900/30 text-red-400 border border-red-700/50' :
                          'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50'
                        }`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-400">
                        <span>Intentos fallidos: {exercise.attempts}</span>
                        <span>Último intento: {exercise.lastAttempt}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRetryExercise(exercise.name)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 font-semibold"
                    >
                      <Play className="w-5 h-5" />
                      Reintentar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-300 font-semibold mb-1">Consejo</p>
                  <p className="text-blue-200 text-sm">Antes de reintentar, revisa la teoría y los ejemplos de solución para mejorar tu comprensión.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Estadísticas (HU-27) */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-5xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowStatsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              Mis Estadísticas de Rendimiento
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Porcentaje de Aciertos</p>
                <p className="text-4xl font-bold text-purple-300">84.4%</p>
              </div>
              <div className="bg-gradient-to-br from-green-900/30 to-black border border-green-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Ejercicios correctos</p>
                <p className="text-4xl font-bold text-green-300">38</p>
              </div>
              <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Ejercicios incorrectos</p>
                <p className="text-4xl font-bold text-red-300">7</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Total intentados</p>
                <p className="text-4xl font-bold text-blue-300">45</p>
              </div>
            </div>

            <div className="mb-6 bg-black/50 border border-purple-800/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-300 mb-4">Rendimiento por categoría</h3>
              <div className="space-y-4">
                {[
                  { category: "Bucles", correct: 12, total: 15, percentage: 80 },
                  { category: "Condicionales", correct: 14, total: 15, percentage: 93.3 },
                  { category: "Funciones", correct: 7, total: 10, percentage: 70 },
                  { category: "Arrays/Listas", correct: 5, total: 5, percentage: 100 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-200 font-semibold">{item.category}</span>
                      <span className="text-purple-300 text-sm">{item.correct}/{item.total} ({item.percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="h-3 bg-black/50 rounded-full overflow-hidden border border-purple-900/50">
                      <div
                        className={`h-full rounded-full ${
                          item.percentage >= 90 ? 'bg-gradient-to-r from-green-600 to-green-500' :
                          item.percentage >= 70 ? 'bg-gradient-to-r from-yellow-600 to-yellow-500' :
                          'bg-gradient-to-r from-red-600 to-red-500'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-950/50 to-black border border-green-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Fortalezas
                </h3>
                <ul className="space-y-2 text-green-200 text-sm">
                  <li>• Excelente manejo de Arrays/Listas (100%)</li>
                  <li>• Buen dominio de Condicionales (93.3%)</li>
                  <li>• Velocidad promedio superior a la media</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-950/50 to-black border border-orange-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-3 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Áreas de mejora
                </h3>
                <ul className="space-y-2 text-orange-200 text-sm">
                  <li>• Practicar más ejercicios de Funciones (70%)</li>
                  <li>• Mejorar comprensión de Bucles (80%)</li>
                  <li>• Reducir intentos por ejercicio</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Ejercicios Pausados (HU-28) */}
      {showPausedExercisesModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-4xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowPausedExercisesModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Ejercicios Pausados
            </h2>

            <p className="text-purple-200 mb-6">Continúa desde donde lo dejaste</p>

            {pausedExercises.length === 0 ? (
              <div className="bg-black/50 border border-purple-800/50 rounded-xl p-8 text-center">
                <Clock className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No tienes ejercicios pausados</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pausedExercises.map((exercise) => (
                  <div key={exercise.id} className="bg-black/50 border border-purple-800/50 rounded-xl p-5 hover:border-purple-600 transition-all">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">{exercise.name}</h3>
                        <div className="flex gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Timer className="w-4 h-4" />
                            Tiempo: {formatTime(exercise.timer)}
                          </span>
                          <span>Pausado: {new Date(exercise.pausedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-3 bg-black/80 rounded-lg p-3 border border-purple-900/50 font-mono text-sm">
                          <p className="text-gray-500 text-xs mb-1">Código guardado:</p>
                          <p className="text-purple-300">{exercise.code || "// Sin código guardado"}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleContinuePausedExercise(exercise.id)}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-500 hover:to-green-600 transition-all shadow-lg shadow-green-500/50 font-semibold"
                        >
                          <Play className="w-5 h-5" />
                          Continuar
                        </button>
                        <button
                          onClick={() => {
                            setPausedExercises(prev => prev.filter(e => e.id !== exercise.id));
                            const newNotification: Notification = {
                              id: Date.now(),
                              message: 'Ejercicio pausado eliminado',
                              type: 'warning'
                            };
                            setNotifications(prev => [...prev, newNotification]);
                            setTimeout(() => {
                              setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
                            }, 5000);
                          }}
                          className="flex items-center gap-2 px-4 py-3 bg-red-900/30 border border-red-700/50 rounded-lg hover:bg-red-900/50 transition-all text-red-400"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Eliminar Ejercicios (HU-29) */}
      {showDeleteExercisesModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-5xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowDeleteExercisesModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Trash2 className="w-6 h-6" />
              Gestión de Ejercicios - Eliminar
            </h2>

            <div className="mb-6 p-4 bg-orange-900/20 border border-orange-700/50 rounded-lg">
              <p className="text-orange-300 text-sm flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Elimina ejercicios obsoletos o mal diseñados para mantener la calidad de la plataforma
              </p>
            </div>

            <div className="space-y-4">
              {exercisesToDelete.length === 0 ? (
                <div className="bg-black/50 border border-purple-800/50 rounded-xl p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-gray-400">No hay ejercicios pendientes de eliminar</p>
                  <p className="text-gray-500 text-sm mt-2">Todos los ejercicios están en buen estado</p>
                </div>
              ) : (
                exercisesToDelete.map((exercise) => (
                  <div key={exercise.id} className="bg-black/50 border border-purple-800/50 rounded-xl p-5 hover:border-purple-600 transition-all">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-purple-300">{exercise.name}</h3>
                          <span className="px-2 py-1 bg-purple-900/30 border border-purple-700/50 rounded text-xs text-purple-300">
                            {exercise.language}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            exercise.status === 'obsolete' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50' :
                            exercise.status === 'bad-design' ? 'bg-red-900/30 text-red-400 border border-red-700/50' :
                            'bg-orange-900/30 text-orange-400 border border-orange-700/50'
                          }`}>
                            {exercise.status === 'obsolete' ? 'Obsoleto' : exercise.status === 'bad-design' ? 'Mal diseñado' : 'Duplicado'}
                          </span>
                        </div>
                        <div className="flex gap-4 text-sm text-gray-400">
                          <span>Usuarios afectados: {exercise.users}</span>
                          <span className="text-red-400">Reportes: {exercise.reports}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-700/50 rounded-lg hover:bg-purple-900/50 transition-all text-purple-300 text-sm">
                          <Eye className="w-4 h-4" />
                          Ver
                        </button>
                        <button
                          onClick={() => handleDeleteExercise(exercise.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-900/30 border border-red-700/50 rounded-lg hover:bg-red-600 hover:border-red-500 transition-all text-red-400 hover:text-white text-sm font-semibold"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-yellow-900/30 to-black border border-yellow-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Ejercicios obsoletos</p>
                <p className="text-3xl font-bold text-yellow-300">{exercisesToDelete.filter(e => e.status === 'obsolete').length}</p>
              </div>
              <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Mal diseñados</p>
                <p className="text-3xl font-bold text-red-300">{exercisesToDelete.filter(e => e.status === 'bad-design').length}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-900/30 to-black border border-orange-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Reportes totales</p>
                <p className="text-3xl font-bold text-orange-300">{exercisesToDelete.reduce((sum, e) => sum + e.reports, 0)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Alertas del Sistema (HU-30) */}
      {showSystemAlertsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-5xl w-full shadow-2xl shadow-purple-900/50 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowSystemAlertsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Bell className="w-6 h-6" />
              Alertas del Sistema
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Alertas críticas</p>
                <p className="text-3xl font-bold text-red-300">
                  {systemAlerts.filter(a => a.severity === 'critical' && a.status !== 'resolved').length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-900/30 to-black border border-orange-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Alertas moderadas</p>
                <p className="text-3xl font-bold text-orange-300">
                  {systemAlerts.filter(a => a.severity === 'warning' && a.status !== 'resolved').length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-900/30 to-black border border-green-700/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Resueltas</p>
                <p className="text-3xl font-bold text-green-300">
                  {systemAlerts.filter(a => a.status === 'resolved').length}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className={`border rounded-xl p-5 transition-all ${
                  alert.severity === 'critical' ? 'bg-red-950/30 border-red-700/50' :
                  alert.severity === 'warning' ? 'bg-orange-950/30 border-orange-700/50' :
                  'bg-blue-950/30 border-blue-700/50'
                }`}>
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <Bell className={`w-6 h-6 mt-1 flex-shrink-0 ${
                        alert.severity === 'critical' ? 'text-red-400' :
                        alert.severity === 'warning' ? 'text-orange-400' :
                        'text-blue-400'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className={`font-semibold ${
                            alert.severity === 'critical' ? 'text-red-300' :
                            alert.severity === 'warning' ? 'text-orange-300' :
                            'text-blue-300'
                          }`}>{alert.service}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            alert.severity === 'critical' ? 'bg-red-900/50 text-red-300 border border-red-700/50' :
                            alert.severity === 'warning' ? 'bg-orange-900/50 text-orange-300 border border-orange-700/50' :
                            'bg-blue-900/50 text-blue-300 border border-blue-700/50'
                          }`}>
                            {alert.severity === 'critical' ? 'CRÍTICO' : alert.severity === 'warning' ? 'ADVERTENCIA' : 'INFO'}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            alert.status === 'active' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50' :
                            alert.status === 'investigating' ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50' :
                            'bg-green-900/50 text-green-300 border border-green-700/50'
                          }`}>
                            {alert.status === 'active' ? 'Activa' : alert.status === 'investigating' ? 'Investigando' : 'Resuelta'}
                          </span>
                        </div>
                        <p className={`text-sm mb-2 ${
                          alert.severity === 'critical' ? 'text-red-200' :
                          alert.severity === 'warning' ? 'text-orange-200' :
                          'text-blue-200'
                        }`}>{alert.message}</p>
                        <p className="text-gray-500 text-xs">{alert.time}</p>
                      </div>
                    </div>

                    {alert.status !== 'resolved' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleInvestigateAlert(alert.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-700/50 rounded-lg hover:bg-purple-900/50 transition-all text-purple-300 text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          Investigar
                        </button>
                        <button
                          onClick={() => handleResolveAlert(alert.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-700/50 rounded-lg hover:bg-green-900/50 transition-all text-green-400 text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Resolver
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-purple-900/20 border border-purple-700/50 rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-purple-300 font-semibold">Configuración de alertas</p>
                  <p className="text-gray-400 text-sm">Recibir notificaciones por email y SMS para alertas críticas</p>
                </div>
                <button
                  onClick={() => {
                    const newNotification: Notification = {
                      id: Date.now(),
                      message: 'Abriendo configuración de alertas...',
                      type: 'info'
                    };
                    setNotifications(prev => [...prev, newNotification]);
                    setTimeout(() => {
                      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
                    }, 5000);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                >
                  <Settings className="w-4 h-4" />
                  Configurar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Agregar Usuario (Admin) */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-purple-900/50 relative">
            <button
              onClick={() => setShowAddUserModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Agregar Nuevo Usuario
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-purple-300 mb-2">Nombre completo</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all text-purple-200"
                />
              </div>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="Ej: juan@email.com"
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all text-purple-200"
                />
              </div>

              <button
                onClick={handleAddUser}
                className="w-full mt-4 flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-500 hover:to-green-600 transition-all shadow-lg shadow-green-500/50 hover:shadow-green-500/70 font-semibold"
              >
                <Plus className="w-5 h-5" />
                Agregar Usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Agregar Curso (Admin) */}
      {showAddCourseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-purple-900/50 relative">
            <button
              onClick={() => setShowAddCourseModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Crear Nuevo Curso
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-purple-300 mb-2">Nombre del curso</label>
                <input
                  type="text"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  placeholder="Ej: Introducción a TypeScript"
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all text-purple-200"
                />
              </div>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Nivel</label>
                <select
                  value={newCourseLevel}
                  onChange={(e) => setNewCourseLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all text-purple-200"
                >
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Número de ejercicios</label>
                <input
                  type="number"
                  value={newCourseExercises}
                  onChange={(e) => setNewCourseExercises(parseInt(e.target.value) || 0)}
                  placeholder="Ej: 20"
                  min="1"
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all text-purple-200"
                />
              </div>

              <button
                onClick={handleAddCourse}
                className="w-full mt-4 flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-500 hover:to-green-600 transition-all shadow-lg shadow-green-500/50 hover:shadow-green-500/70 font-semibold"
              >
                <Plus className="w-5 h-5" />
                Crear Curso
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Asignar Curso (Admin) */}
      {showAssignCourseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-purple-900/50 relative">
            <button
              onClick={() => setShowAssignCourseModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Asignar Curso a Estudiante
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-purple-300 mb-2">Seleccionar curso</label>
                <select
                  value={selectedCourseToAssign}
                  onChange={(e) => setSelectedCourseToAssign(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all text-purple-200"
                >
                  <option value="">-- Selecciona un curso --</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.name}>{course.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-purple-300 mb-2">Seleccionar estudiante</label>
                <select
                  value={selectedStudentToAssign}
                  onChange={(e) => setSelectedStudentToAssign(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all text-purple-200"
                >
                  <option value="">-- Selecciona un estudiante --</option>
                  {users.filter(u => u.status === 'active').map((user, idx) => (
                    <option key={idx} value={user.name}>{user.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAssignCourse}
                className="w-full mt-4 flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 font-semibold"
              >
                <CheckCircle className="w-5 h-5" />
                Asignar Curso
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 space-y-16">
        
        {/* Si el administrador está logueado, mostrar solo el panel de administrador */}
        {currentAdmin ? (
          <>
            {/* Panel de Administrador para Admin */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl font-bold text-purple-400">Panel de Administración</h2>
              </div>

              <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
                <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                  <p className="text-yellow-300 text-sm">
                    ⚠ Panel de administración - Usuario: {currentAdmin.fullName}
                  </p>
                </div>

                {/* Botones de acciones del administrador */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={() => setShowLoginLogsModal(true)}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/50"
                  >
                    <Activity className="w-5 h-5" />
                    Ver logs de sesión
                  </button>

                  <button
                    onClick={() => setShowSolutionsManagementModal(true)}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-500 hover:to-green-600 transition-all shadow-lg shadow-green-500/50"
                  >
                    <FileText className="w-5 h-5" />
                    Gestionar soluciones
                  </button>

                  <button
                    onClick={() => setShowNotificationConfigModal(true)}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg shadow-orange-500/50"
                  >
                    <Settings className="w-5 h-5" />
                    Config. notificaciones
                  </button>

                  <button
                    onClick={() => setShowTimeReportsModal(true)}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                  >
                    <Clock className="w-5 h-5" />
                    Reportes de tiempo
                  </button>

                  <button
                    onClick={() => setShowPlatformStatusModal(true)}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg hover:from-cyan-500 hover:to-cyan-600 transition-all shadow-lg shadow-cyan-500/50"
                  >
                    <Activity className="w-5 h-5" />
                    Estado plataforma
                  </button>

                  <button
                    onClick={() => setShowDeleteExercisesModal(true)}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-500/50"
                  >
                    <Trash2 className="w-5 h-5" />
                    Eliminar ejercicios
                  </button>

                  <button
                    onClick={() => setShowSystemAlertsModal(true)}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg shadow-yellow-500/50"
                  >
                    <Bell className="w-5 h-5" />
                    Alertas del sistema
                  </button>

                  <button
                    onClick={() => setShowSearchResults(!showSearchResults)}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-600 to-pink-700 rounded-lg hover:from-pink-500 hover:to-pink-600 transition-all shadow-lg shadow-pink-500/50"
                  >
                    <Search className="w-5 h-5" />
                    Buscar usuario
                  </button>

                  <button
                    onClick={() => setShowAddUserModal(true)}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-500 hover:to-green-600 transition-all shadow-lg shadow-green-500/50"
                  >
                    <Plus className="w-5 h-5" />
                    Agregar usuario
                  </button>
                </div>

                {/* Barra de búsqueda */}
                {showSearchResults && (
                  <div className="mb-6 bg-black/50 border border-purple-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Search className="w-5 h-5 text-purple-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Buscar por nombre o email..."
                        className="flex-1 px-4 py-2 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all text-purple-200"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery("");
                          setFilteredUsers([]);
                        }}
                        className="px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg hover:bg-gray-700 transition-all text-white"
                      >
                        Cerrar
                      </button>
                    </div>

                    {searchQuery && (
                      <div className="bg-black/80 border border-purple-700/50 rounded-lg p-4">
                        <p className="text-purple-300 text-sm mb-3">
                          {filteredUsers.length > 0
                            ? `${filteredUsers.length} resultado(s) encontrado(s)`
                            : 'No se encontraron resultados'}
                        </p>

                        {filteredUsers.length > 0 && (
                          <div className="space-y-2">
                            {filteredUsers.map((user, idx) => (
                              <div key={idx} className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-3 hover:bg-purple-900/30 transition-all">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-purple-200 font-semibold">{user.name}</p>
                                    <p className="text-gray-400 text-sm">{user.email}</p>
                                  </div>
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    user.status === 'active'
                                      ? 'bg-green-900/30 text-green-400 border border-green-700/50'
                                      : 'bg-red-900/30 text-red-400 border border-red-700/50'
                                  }`}>
                                    {user.status === 'active' ? 'Activo' : 'Bloqueado'}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  {users.map((user, idx) => (
                    <div
                      key={idx}
                      className={`bg-black/50 border border-purple-800/50 rounded-xl p-5 hover:border-purple-600 transition-all ${
                        deletingUser === user.name ? 'animate-pulse opacity-50' : ''
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-purple-300">{user.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.status === 'active'
                                ? 'bg-green-900/30 text-green-400 border border-green-700/50'
                                : 'bg-red-900/30 text-red-400 border border-red-700/50'
                            }`}>
                              {user.status === 'active' ? 'Activo' : 'Bloqueado'}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-1">{user.email}</p>
                          <div className="flex gap-4 text-xs text-gray-500">
                            <span>Ejercicios: {user.exercises}</span>
                            <span>Último acceso: {user.lastLogin}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => {
                              setSelectedUserForHistory(user.name);
                              setShowUserHistoryModal(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-700/50 rounded-lg hover:bg-purple-900/50 transition-all text-purple-300 text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            Ver historial
                          </button>
                          {deletingUser === user.name ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDeleteUser(user.name)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 border border-red-500 rounded-lg hover:bg-red-700 transition-all text-white text-sm font-semibold"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Confirmar
                              </button>
                              <button
                                onClick={() => setDeletingUser(null)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg hover:bg-gray-700 transition-all text-white text-sm"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => setDeletingUser(user.name)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-900/30 border border-red-700/50 rounded-lg hover:bg-red-900/50 transition-all text-red-400 text-sm"
                              >
                                <Trash2 className="w-4 h-4" />
                                Eliminar
                              </button>
                              <button
                                onClick={() => handleToggleUserStatus(user.name)}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-900/30 border border-orange-700/50 rounded-lg hover:bg-orange-900/50 transition-all text-orange-400 text-sm"
                              >
                                <Ban className="w-4 h-4" />
                                {user.status === 'active' ? 'Bloquear' : 'Desbloquear'}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-700/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Total de usuarios</p>
                    <p className="text-3xl font-bold text-purple-300">{users.length}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-900/30 to-black border border-green-700/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Usuarios activos</p>
                    <p className="text-3xl font-bold text-green-300">{users.filter(u => u.status === 'active').length}</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-700/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Usuarios bloqueados</p>
                    <p className="text-3xl font-bold text-red-300">{users.filter(u => u.status === 'blocked').length}</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Contenido para usuarios normales */}
        
        {/* Sección: Mi Progreso y Herramientas (HU-26, HU-27, HU-28) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-purple-400">Mi Progreso y Herramientas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => setShowStatsModal(true)}
              className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 hover:border-purple-600 transition-all cursor-pointer shadow-lg hover:shadow-purple-500/50"
            >
              <Trophy className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-purple-300 mb-2">Mis Estadísticas</h3>
              <p className="text-gray-400 text-sm mb-4">Ver porcentaje de aciertos y rendimiento</p>
              <div className="bg-black/50 border border-purple-800/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Porcentaje de aciertos</p>
                <p className="text-3xl font-bold text-purple-300">84.4%</p>
              </div>
            </div>

            <div
              onClick={() => setShowRetryExerciseModal(true)}
              className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 hover:border-purple-600 transition-all cursor-pointer shadow-lg hover:shadow-purple-500/50"
            >
              <Play className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-purple-300 mb-2">Ejercicios Fallidos</h3>
              <p className="text-gray-400 text-sm mb-4">Repite ejercicios para mejorar</p>
              <div className="bg-black/50 border border-purple-800/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Ejercicios por reintentar</p>
                <p className="text-3xl font-bold text-red-300">3</p>
              </div>
            </div>

            <div
              onClick={() => setShowPausedExercisesModal(true)}
              className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 hover:border-purple-600 transition-all cursor-pointer shadow-lg hover:shadow-purple-500/50"
            >
              <Clock className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold text-purple-300 mb-2">Ejercicios Pausados</h3>
              <p className="text-gray-400 text-sm mb-4">Continúa desde donde lo dejaste</p>
              <div className="bg-black/50 border border-purple-800/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Ejercicios pausados</p>
                <p className="text-3xl font-bold text-orange-300">{pausedExercises.length}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Práctica de Velocidad (HU-07) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-cyan-500" />
            <h2 className="text-3xl font-bold text-purple-400">Práctica de Velocidad</h2>
          </div>

          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
            <p className="text-purple-200 mb-6">
              Mejora tu velocidad de programación escribiendo código bajo presión de tiempo
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/50 border border-purple-800/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Tu velocidad promedio</p>
                <p className="text-3xl font-bold text-purple-300">145 CPM</p>
              </div>
              <div className="bg-black/50 border border-purple-800/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Ejercicios completados</p>
                <p className="text-3xl font-bold text-green-300">38</p>
              </div>
              <div className="bg-black/50 border border-purple-800/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Mejor tiempo</p>
                <p className="text-3xl font-bold text-cyan-300">45s</p>
              </div>
            </div>

            <button
              onClick={() => setShowSpeedPracticeModal(true)}
              className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg hover:from-cyan-500 hover:to-cyan-600 transition-all shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 font-semibold"
            >
              <Play className="w-5 h-5" />
              Comenzar práctica de velocidad
            </button>
          </div>
        </section>

        {/* Sección: Asistente de IA (HU-08) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-purple-400">Asistente de IA</h2>
          </div>

          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
            <p className="text-purple-200 mb-6">
              ¿Tienes dudas sobre programación? Nuestro asistente de IA está aquí para ayudarte
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/50 border border-purple-800/50 rounded-xl p-4">
                <Lightbulb className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Explicaciones</h3>
                <p className="text-gray-400 text-sm">Obtén explicaciones claras sobre conceptos de programación</p>
              </div>
              <div className="bg-black/50 border border-purple-800/50 rounded-xl p-4">
                <Code2 className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Ayuda con código</h3>
                <p className="text-gray-400 text-sm">Recibe sugerencias para mejorar tu código</p>
              </div>
              <div className="bg-black/50 border border-purple-800/50 rounded-xl p-4">
                <CheckCircle className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Soluciones</h3>
                <p className="text-gray-400 text-sm">Encuentra diferentes formas de resolver problemas</p>
              </div>
            </div>

            <button
              onClick={() => setShowAISuggestionsModal(true)}
              className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 font-semibold"
            >
              <Lightbulb className="w-5 h-5" />
              Hacer una pregunta a la IA
            </button>
          </div>
        </section>

        {/* Sección: Recomendaciones con IA (HU-09) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-purple-400">Recomendaciones para ti</h2>
          </div>

          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
            <p className="text-purple-200 mb-6">
              Basado en tus errores en bucles, te recomendamos practicar estos ejercicios
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Bucles While", difficulty: "Fácil", progress: 0 },
                { title: "Iteración con For", difficulty: "Medio", progress: 0 },
                { title: "Bucles anidados", difficulty: "Difícil", progress: 0 }
              ].map((exercise, idx) => (
                <div
                  key={idx}
                  className="bg-black/50 border border-purple-800/50 rounded-xl p-4 hover:border-purple-600 transition-all group"
                >
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">{exercise.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Dificultad:</span>
                    <span className={`text-sm font-semibold ${
                      exercise.difficulty === 'Fácil' ? 'text-green-400' :
                      exercise.difficulty === 'Medio' ? 'text-yellow-400' : 'text-red-400'
                    }`}>{exercise.difficulty}</span>
                  </div>
                  <button
                    onClick={() => {
                      const newNotification: Notification = {
                        id: Date.now(),
                        message: `Iniciando práctica: ${exercise.title}`,
                        type: 'info'
                      };
                      setNotifications(prev => [...prev, newNotification]);
                      setTimeout(() => {
                        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
                      }, 5000);
                    }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 text-sm font-semibold"
                  >
                    Practicar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: Ejercicios de Sintaxis (HU-01) */}
        <section id="ejercicios" className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">Ejercicios de Sintaxis</h2>

          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
            {/* Cronómetro de ejercicio (HU-15) */}
            <div className="mb-6 bg-black/50 border border-purple-800/50 rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Timer className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Tiempo transcurrido</p>
                    <p className="text-2xl font-bold text-purple-300 font-mono">{formatTime(exerciseTimer)}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!isTimerRunning ? (
                    <button
                      onClick={() => setIsTimerRunning(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-500 hover:to-green-600 transition-all shadow-lg shadow-green-500/50 text-sm"
                    >
                      <Play className="w-4 h-4" />
                      Iniciar
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsTimerRunning(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg shadow-yellow-500/50 text-sm"
                    >
                      Pausar
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setExerciseTimer(0);
                      setIsTimerRunning(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-500/50 text-sm"
                  >
                    Reiniciar
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border border-purple-700/50">
              <p className="text-purple-200">Corrige el error de sintaxis:</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-purple-300 mb-2">Escribe tu código aquí:</label>
              <textarea
                value={currentExerciseCode}
                onChange={(e) => setCurrentExerciseCode(e.target.value)}
                placeholder="for i in range(5)&#10;    print(i)"
                className="w-full h-32 px-4 py-3 bg-black/80 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all font-mono text-sm text-purple-300"
              />
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={handleVerifyCode}
                disabled={verifyingCode || codeVerified}
                className={`px-8 py-3 bg-gradient-to-r rounded-lg transition-all shadow-lg ${
                  codeVerified
                    ? 'from-green-600 to-green-700 shadow-green-500/50'
                    : verifyingCode
                    ? 'from-yellow-600 to-yellow-700 shadow-yellow-500/50 animate-pulse'
                    : 'from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 shadow-purple-500/50 hover:shadow-purple-500/70'
                }`}
              >
                {codeVerified ? '✓ Verificado' : verifyingCode ? 'Verificando...' : 'Verificar sintaxis'}
              </button>

              {/* Botón Ver Solución (HU-13) */}
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="px-8 py-3 border border-purple-600 rounded-lg hover:bg-purple-900/30 transition-all"
              >
                {showSolution ? 'Ocultar solución' : 'Ver solución'}
              </button>

              {/* Botón Ver Teoría (HU-22) */}
              <button
                onClick={() => setShowTheoryModal(true)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/50"
              >
                <FileText className="w-5 h-5" />
                Ver teoría
              </button>

              {/* Botón Mejorar Código (HU-25) */}
              <button
                onClick={() => setShowCodeImprovementModal(true)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg shadow-yellow-500/50"
              >
                <Lightbulb className="w-5 h-5" />
                Mejorar código
              </button>

              {/* Botón Pausar (HU-28) */}
              <button
                onClick={handlePauseExercise}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg shadow-orange-500/50"
              >
                <Clock className="w-5 h-5" />
                Pausar
              </button>
            </div>
            
            {/* Panel de Solución */}
            {showSolution && (
              <div className="mt-6 bg-gradient-to-br from-green-950/50 to-black border border-green-800/50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Solución correcta
                </h3>
                
                <div className="bg-black/80 rounded-xl p-6 border border-green-900/50 font-mono text-sm">
                  <div className="flex gap-4">
                    <div className="text-gray-600">
                      <div>1</div>
                      <div>2</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-green-400">for i in range(5):</div>
                      <div className="text-purple-300">    print(i)</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                  <p className="text-green-300 font-semibold mb-2">Explicación:</p>
                  <p className="text-green-200 text-sm">
                    En Python, los bucles for deben terminar con dos puntos (:) para indicar el inicio del bloque de código.
                  </p>
                </div>
                
                <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                  <p className="text-green-300 font-semibold mb-2">Posibles variantes:</p>
                  <div className="bg-black/50 rounded-lg p-3 font-mono text-sm">
                    <div className="text-green-400">for i in range(0, 5):</div>
                    <div className="text-purple-300 ml-4">print(i)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Detector automático de errores (HU-02) */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">Detector Automático de Errores</h2>
          
          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
            <div className="bg-black/80 rounded-xl p-6 border border-purple-900/50 font-mono text-sm mb-4">
              <div className="flex gap-4">
                <div className="text-gray-600">
                  <div>1</div>
                  <div>2</div>
                </div>
                <div className="flex-1">
                  <div className="bg-red-900/30 border-l-4 border-red-500 pl-2 text-red-400">for i in range(5)</div>
                  <div className="text-purple-300">    print(i)</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
              <div className="text-red-500 mt-1">⚠</div>
              <p className="text-red-300">Error de sintaxis detectado en la línea 1: falta ':'</p>
            </div>
          </div>
        </section>

        {/* Section 3: Retroalimentación inmediata (HU-03) */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">Retroalimentación Inmediata</h2>
          
          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
            <div className="bg-black/80 rounded-xl p-6 border border-purple-900/50 font-mono text-sm mb-4">
              <div className="flex gap-4">
                <div className="text-gray-600">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                </div>
                <div className="flex-1">
                  <div className="text-purple-300">for i in range(5):</div>
                  <div className="text-purple-300">    print(i)</div>
                  <div className="text-gray-500"># Output: 0 1 2 3 4</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleRunCode}
              disabled={runningCode || codeRun}
              className={`px-8 py-3 bg-gradient-to-r rounded-lg transition-all shadow-lg mb-4 flex items-center gap-2 ${
                codeRun
                  ? 'from-green-600 to-green-700 shadow-green-500/50'
                  : runningCode
                  ? 'from-yellow-600 to-yellow-700 shadow-yellow-500/50 animate-pulse'
                  : 'from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 shadow-purple-500/50 hover:shadow-purple-500/70'
              }`}
            >
              <Play className="w-5 h-5" />
              {codeRun ? '✓ Ejecutado' : runningCode ? 'Ejecutando...' : 'Ejecutar código'}
            </button>
            
            <div className="flex items-start gap-3 p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <p className="text-green-400 font-semibold">✓ Código correcto</p>
                <p className="text-green-300 text-sm mt-1">Tu código funciona correctamente</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Selección de lenguaje (HU-04) */}
        <section id="lenguajes" className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">Selecciona el lenguaje</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Python", icon: "🐍" },
              { name: "Java", icon: "☕" },
              { name: "C++", icon: "⚡" },
              { name: "JavaScript", icon: "🚀" }
            ].map((lang) => (
              <div
                key={lang.name}
                onClick={() => handleSelectLanguage(lang.name)}
                className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-8 hover:border-purple-600 transition-all cursor-pointer shadow-lg hover:shadow-purple-500/50 group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{lang.icon}</div>
                <h3 className="text-xl font-bold text-purple-300 group-hover:text-purple-200">{lang.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Ejercicios por tipo de proyecto (HU-05) */}
        <section id="proyectos" className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">Ejercicios por Tipo de Proyecto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Calculadora", icon: Calculator, color: "from-purple-600 to-pink-600" },
              { name: "Sistema de Inventario", icon: Package, color: "from-purple-600 to-blue-600" },
              { name: "Juego simple", icon: Gamepad2, color: "from-purple-600 to-green-600" },
              { name: "Gestión de estudiantes", icon: Trophy, color: "from-purple-600 to-orange-600" }
            ].map((project) => (
              <div
                key={project.name}
                onClick={() => handleSelectProject(project.name)}
                className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 hover:border-purple-600 transition-all cursor-pointer shadow-lg hover:shadow-purple-500/50 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <project.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-300 group-hover:text-purple-200">{project.name}</h3>
                    <p className="text-gray-500 text-sm">Práctica con proyectos reales</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Sistema de dificultad adaptativa (HU-06) */}
        <section id="progreso" className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">Sistema de Dificultad Adaptativa</h2>
          
          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-8 shadow-2xl shadow-purple-900/20">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Nivel actual:</p>
                <p className="text-2xl font-bold text-purple-300">Intermedio</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progreso general</span>
                <span className="text-purple-400">65%</span>
              </div>
              <div className="h-4 bg-black/50 rounded-full overflow-hidden border border-purple-900/50">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg shadow-purple-500/50"
                  style={{ width: '65%' }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/50 rounded-xl p-4 border border-purple-900/50">
                <p className="text-gray-400 text-sm">Ejercicios completados</p>
                <p className="text-3xl font-bold text-purple-300">24</p>
              </div>
              <div className="bg-black/50 rounded-xl p-4 border border-purple-900/50">
                <p className="text-gray-400 text-sm">Racha actual</p>
                <p className="text-3xl font-bold text-purple-300">7 días</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-500 mt-1" />
              <div className="flex-1">
                <p className="text-purple-200 font-semibold">¡Felicitaciones!</p>
                <p className="text-purple-300 text-sm mt-1">Has mejorado tu rendimiento. Se desbloquea el nivel avanzado.</p>
              </div>
              <button
                onClick={handleNotifyLevelUp}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 text-sm whitespace-nowrap hover:shadow-purple-500/70"
              >
                <Bell className="w-4 h-4" />
                Notificarme
              </button>
            </div>
          </div>
        </section>

        {/* Sección: Historial de Ejercicios (HU-12) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold text-purple-400">Historial de Ejercicios</h2>
          </div>
          
          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-800/50">
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Ejercicio</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Estado</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Fecha</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Tiempo</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Intentos</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Bucle For básico", status: "correct", date: "21/03/2026", attempts: 1, time: "2m 15s" },
                    { name: "Condicionales if-else", status: "correct", date: "20/03/2026", attempts: 2, time: "4m 32s" },
                    { name: "Funciones con parámetros", status: "incorrect", date: "19/03/2026", attempts: 3, time: "6m 45s" },
                    { name: "Listas y arrays", status: "correct", date: "18/03/2026", attempts: 1, time: "1m 58s" },
                    { name: "Bucles anidados", status: "incorrect", date: "17/03/2026", attempts: 4, time: "8m 12s" },
                    { name: "Manejo de strings", status: "correct", date: "16/03/2026", attempts: 2, time: "3m 27s" },
                  ].map((exercise, idx) => (
                    <tr 
                      key={idx} 
                      className="border-b border-purple-900/30 hover:bg-purple-900/20 transition-colors"
                    >
                      <td className="py-4 px-4 text-purple-200">{exercise.name}</td>
                      <td className="py-4 px-4">
                        {exercise.status === "correct" ? (
                          <span className="flex items-center gap-2 text-green-400">
                            <CheckCircle className="w-5 h-5" />
                            Correcto
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-red-400">
                            <X className="w-5 h-5" />
                            Incorrecto
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-400">{exercise.date}</td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-1 text-purple-300">
                          <Timer className="w-4 h-4" />
                          {exercise.time}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-purple-300">{exercise.attempts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

          </>
        )}
      </div>
    </div>
  );
}