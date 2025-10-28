import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { 
  Package, Truck, Mail, Box, AlertTriangle, CheckCircle, XCircle, Trash2, History,
  MoreVertical, Star, Edit3, Archive, X, Menu, Settings, Info, HelpCircle,
  Shield, BookOpen, Users, Moon, Sun, Globe, Loader, Rss,
  UserCheck, PlusCircle, LogOut, BarChart, ArrowLeft, MinusCircle
} from 'lucide-react';

// --- i18n (Translations) ---
const translations = {
  en: {
    // General
    appTitle: "TrackIt",
    appSubtitle: "Your packages, one timeline.",
    loading: "Loading your packages...",
    close: "Close",
    // Sidebar
    menu: "Menu",
    dashboard: "Dashboard",
    language: "Language",
    about: "About TrackIt",
    faq: "FAQ",
    privacy: "Privacy Policy",
    couriers: "All Couriers",
    // Main Dashboard
    addPackage: "Add a Tracking Number",
    track: "Track",
    trackPlaceholder: "Paste your tracking number here...",
    namePackage: "What's in this package?",
    namePlaceholder: "e.g., New Running Shoes",
    addToList: "Add to List",
    cancel: "Cancel",
    upcoming: "Upcoming Packages",
    delivered: "Delivered",
    archived: "Archived",
    noUpcoming: "No upcoming packages.",
    noUpcomingSub: "Add a tracking number above to get started!",
    noDelivered: "No delivered packages yet.",
    noArchived: "No archived packages.",
    carrierDetected: "Package Detected",
    // Detail Page
    backToDash: "Back to Dashboard",
    currentStatus: "Current Status",
    trackingHistory: "Tracking History",
    // Package Item
    markDelivered: "Mark as Delivered",
    moveToUpcoming: "Move to Upcoming",
    remove: "Remove",
    unprioritize: "Unprioritize",
    prioritize: "Prioritize",
    editName: "Edit Name",
    unarchive: "Unarchive",
    archive: "Archive",
    editPackageName: "Edit Package Name",
    save: "Save",
    // Statuses
    statusOutForDelivery: "Out for Delivery",
    statusProblem: "Problem",
    statusInTransit: "In Transit",
    // Errors
    errorTracking: "Please enter a tracking number.",
    errorRecognize: "Sorry, that tracking number isn't recognized.",
    errorName: "Please name your package.",
    // Admin
    adminLogin: "Admin Login",
    password: "Password",
    login: "Login",
    wrongPass: "Wrong password. Please try again.",
    adminDash: "Admin Dashboard",
    totalTracked: "Total Packages Tracked",
    virtualPackages: "Virtual Package Database",
    createVirtual: "Create New Virtual Package",
    noVirtual: "No virtual packages created yet.",
    create: "Create",
    logout: "Logout",
    trackingCode: "Tracking Code",
    packageName: "Package Name",
    carrier: "Carrier",
    status: "Status",
    estDelivery: "Estimated Delivery",
    selectCarrier: "Select a carrier...",
    selectStatus: "Select a status...",
    addHistoryEvent: "Add History Event",
    dateAndTime: "Date and Time",
    eventStatus: "Event Status (e.g., Out for Delivery)",
    eventLocation: "Event Location (e.g., Local Hub)",
    removeEvent: "Remove Event",
  },
  es: {
    // General
    appTitle: "TrackIt",
    appSubtitle: "Sus paquetes, una línea de tiempo.",
    loading: "Cargando tus paquetes...",
    close: "Cerrar",
    // Sidebar
    menu: "Menú",
    dashboard: "Tablero",
    language: "Idioma",
    about: "Sobre TrackIt",
    faq: "Preguntas Frecuentes",
    privacy: "Política de Privacidad",
    couriers: "Todos los Mensajeros",
    // Main Dashboard
    addPackage: "Añadir un Número de Seguimiento",
    track: "Rastrear",
    trackPlaceholder: "Pega tu número de seguimiento aquí...",
    namePackage: "¿Qué hay en este paquete?",
    namePlaceholder: "ej., Zapatos nuevos para correr",
    addToList: "Añadir a la lista",
    cancel: "Cancelar",
    upcoming: "Paquetes Próximos",
    delivered: "Entregados",
    archived: "Archivados",
    noUpcoming: "No hay paquetes próximos.",
    noUpcomingSub: "¡Añade un número de seguimiento arriba para empezar!",
    noDelivered: "Aún no hay paquetes entregados.",
    noArchived: "No hay paquetes archivados.",
    carrierDetected: "Paquete Detectado",
    // Detail Page
    backToDash: "Volver al Tablero",
    currentStatus: "Estado Actual",
    trackingHistory: "Historial de Seguimiento",
    // Package Item
    markDelivered: "Marcar como Entregado",
    moveToUpcoming: "Mover a Próximos",
    remove: "Eliminar",
    unprioritize: "Despriorizar",
    prioritize: "Priorizar",
    editName: "Editar Nombre",
    unarchive: "Desarchivar",
    archive: "Archivar",
    editPackageName: "Editar Nombre del Paquete",
    save: "Guardar",
    // Statuses
    statusOutForDelivery: "En Reparto",
    statusProblem: "Problema",
    statusInTransit: "En Tránsito",
    // Errors
    errorTracking: "Por favor, ingrese un número de seguimiento.",
    errorRecognize: "Lo sentimos, ese número de seguimiento no se reconoce.",
    errorName: "Por favor, nombre su paquete.",
    // Admin
    adminLogin: "Acceso de Administrador",
    password: "Contraseña",
    login: "Acceder",
    wrongPass: "Contraseña incorrecta. Inténtalo de nuevo.",
    adminDash: "Panel de Administrador",
    totalTracked: "Total de Paquetes Rastreados",
    virtualPackages: "Base de Datos de Paquetes Virtuales",
    createVirtual: "Crear Nuevo Paquete Virtual",
    noVirtual: "Aún no se han creado paquetes virtuales.",
    create: "Crear",
    logout: "Cerrar Sesión",
    trackingCode: "Código de Seguimiento",
    packageName: "Nombre del Paquete",
    carrier: "Mensajero",
    status: "Estado",
    estDelivery: "Entrega Estimada",
    selectCarrier: "Seleccione un mensajero...",
    selectStatus: "Seleccione un estado...",
    addHistoryEvent: "Añadir Evento de Historial",
    dateAndTime: "Fecha y Hora",
    eventStatus: "Estado del Evento (ej., En Reparto)",
    eventLocation: "Ubicación del Evento (ej., Hub Local)",
    removeEvent: "Eliminar Evento",
  },
  fr: {
    // General
    appTitle: "TrackIt",
    appSubtitle: "Vos colis, un seul suivi.",
    loading: "Chargement de vos colis...",
    close: "Fermer",
    // Sidebar
    menu: "Menu",
    dashboard: "Tableau de Bord",
    language: "Langue",
    about: "À propos de TrackIt",
    faq: "FAQ",
    privacy: "Politique de Confidentialité",
    couriers: "Tous les Courriers",
    // Main Dashboard
    addPackage: "Ajouter un Numéro de Suivi",
    track: "Suivre",
    trackPlaceholder: "Collez votre numéro de suivi ici...",
    namePackage: "Que contient ce colis ?",
    namePlaceholder: "ex., Nouvelles chaussures de course",
    addToList: "Ajouter à la liste",
    cancel: "Annuler",
    upcoming: "Colis à Venir",
    delivered: "Livrés",
    archived: "Archivés",
    noUpcoming: "Aucun colis à venir.",
    noUpcomingSub: "Ajoutez un numéro de suivi ci-dessus pour commencer !",
    noDelivered: "Aucun colis livré pour le moment.",
    noArchived: "Aucun colis archivé.",
    carrierDetected: "Colis Détecté",
    // Detail Page
    backToDash: "Retour au Tableau de Bord",
    currentStatus: "Statut Actuel",
    trackingHistory: "Historique de Suivi",
    // Package Item
    markDelivered: "Marquer como Livré",
    moveToUpcoming: "Déplacer vers 'À Venir'",
    remove: "Supprimer",
    unprioritize: "Retirer la priorité",
    prioritize: "Prioriser",
    editName: "Modifier le Nom",
    unarchive: "Désarchiver",
    archive: "Archiver",
    editPackageName: "Modifier le Nom du Colis",
    save: "Enregistrer",
    // Statuses
    statusOutForDelivery: "En Cours de Livraison",
    statusProblem: "Problème",
    statusInTransit: "En Transit",
    // Errors
    errorTracking: "Veuillez entrer un numéro de seguimiento.",
    errorRecognize: "Désolé, ce numéro de suivi n'est pas reconnu.",
    errorName: "Veuillez nommer votre colis.",
    // Admin
    adminLogin: "Connexion Administrateur",
    password: "Mot de passe",
    login: "Connexion",
    wrongPass: "Mot de passe incorrect. Veuillez réessayer.",
    adminDash: "Tableau de Bord Admin",
    totalTracked: "Total des Colis Suivis",
    virtualPackages: "Base de Données des Colis Virtuels",
    createVirtual: "Créer un Nouveau Colis Virtuel",
    noVirtual: "Aucun colis virtuel créé pour le moment.",
    create: "Créer",
    logout: "Déconnexion",
    trackingCode: "Code de Suivi",
    packageName: "Nom du Colis",
    carrier: "Transporteur",
    status: "Statut",
    estDelivery: "Livraison Estimée",
    selectCarrier: "Choisissez un transporteur...",
    selectStatus: "Choisissez un statut...",
    addHistoryEvent: "Ajouter un Événement",
    dateAndTime: "Date et Heure",
    eventStatus: "Statut de l'Événement (ex., En Livraison)",
    eventLocation: "Lieu de l'Événement (ex., Hub Local)",
    removeEvent: "Supprimer l'Événement",
  },
};

// --- Custom Translation Hook ---
const useTranslation = (language) => {
  return (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };
};

// --- Loading Screen Component ---
const LoadingScreen = ({ t }) => (
  <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center z-50 transition-colors duration-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-blue-600 p-3 rounded-lg">
        <Package className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t('appTitle')}</h1>
    </div>
    <Loader className="w-8 h-8 text-blue-600 animate-spin" />
    <p className="text-gray-600 dark:text-gray-400 mt-4">{t('loading')}</p>
  </div>
);


// --- Helper: useOnClickOutside ---
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// --- Carrier Icon Component ---
const CarrierIcon = ({ carrier, large = false }) => {
  const iconStyle = large 
    ? "w-16 h-16 rounded-lg flex items-center justify-center shrink-0"
    : "w-10 h-10 rounded-md flex items-center justify-center shrink-0";
  const svgSize = large ? "w-12 h-12" : "w-8 h-8";
  
  const DhlIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 0H83.2514L100 30L83.2514 60H0V0Z" fill="#D40511"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.9191 14.8148H22.3152V45.1852H12.9191V14.8148Z" fill="#FFCC00"/>
      <path d="M36.191 14.8148H26.7949V26.2963H35.0899V33.7037H26.7949V45.1852H36.191C42.0673 45.1852 46.7949 40.9231 46.7949 30C46.7949 19.0769 42.0673 14.8148 36.191 14.8148Z" fill="#FFCC00"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M60.6667 14.8148H51.2706V45.1852H60.6667C69.043 45.1852 75.2706 38.8354 75.2706 30C75.2706 21.1646 69.043 14.8148 60.6667 14.8148ZM55.6327 39.037H60.6667C65.9928 39.037 69.6327 34.9928 69.6327 30C69.6327 25.0072 65.9928 20.963 60.6667 20.963H55.6327V39.037Z" fill="#FFCC00"/>
    </svg>
  );

  switch (carrier) {
    case 'UPS':
      return (
        <div className={`${iconStyle} bg-[#351C15]`}>
          <svg className={svgSize} fill="none" viewBox="0 0 100 100">
            <path d="M50.001 0C22.384 0 0 22.383 0 50.001 0 77.616 22.384 100 50.001 100 77.616 100 100 77.616 100 50.001 100 22.383 77.616 0 50.001 0z" fill="#B79238"/>
            <path d="M43.682 66.824h12.553v-8.818c0-5.467 4.436-9.903 9.903-9.903h4.63V32.22H38.905v9.182h-4.34c-5.467 0-9.904 4.436-9.904 9.903v15.517z" fill="#351C15"/>
          </svg>
        </div>
      );
    case 'FedEx':
      return (
        <div className={`${iconStyle} bg-[#4D148C]`}>
          <svg className={svgSize} fill="white" viewBox="0 0 24 24">
            <path d="M12.38 10.49h1.96v-2.1h-1.96v-1.2h2.64v-1.62h-4.48v6.75h4.6v-1.62h-2.76v.79zm-2.13.91h-2v1.62h-1.84V7.57h4.74c1.8 0 2.92.83 2.92 2.3 0 1.07-.6 1.76-1.5 2.05l1.92 3.12h-2.1l-1.68-2.66zm0-3.32h-2v1.7h2c.6 0 1.04-.3 1.04-.85s-.44-.85-1.04-.85zM17.4 7.57h3.81v1.62h-1.96v1.62h1.83v1.62h-1.83v1.6h2.1v1.62h-3.95V7.57z"/>
          </svg>
        </div>
      );
    case 'USPS':
      return (
        <div className={`${iconStyle} bg-[#004B87]`}>
          <svg className={svgSize} fill="white" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.32 14.86c-.16.14-.36.2-.56.2-.33 0-.64-.16-.84-.44l-2.08-2.9-2.08 2.9c-.2.28-.51.44-.84.44-.2 0-.4-.06-.56-.2-.36-.32-.44-.83-.23-1.24l2.67-4.14-2.67-4.14c-.21-.41-.13-.92.23-1.24.36-.32.9-.32 1.26 0l.1.09 2.16 3.19 2.16-3.19.1-.09c.36-.32.9-.32 1.26 0 .36.32.44.83.23 1.24l-2.67 4.14 2.67 4.14c.21.41.13.92-.23 1.24z"/>
          </svg>
        </div>
      );
    case 'Amazon':
      return (
        <div className={`${iconStyle} bg-black`}>
          <svg className={svgSize} fill="none" viewBox="0 0 48 48">
            <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z" fill="#232F3E"/>
            <path d="M30.435 34.348c-4.522 0-8.217-3.696-8.217-8.217s3.695-8.217 8.217-8.217c1.956 0 3.826.696 5.26 1.957l2.87-2.87c-2.392-2.304-5.565-3.696-9.13-3.696-7.305 0-13.218 5.913-13.218 13.217 0 7.304 5.913 13.217 13.218 13.217 3.565 0 6.739-1.391 9.13-3.696l-2.87-2.87c-1.434 1.26-3.304 1.957-5.26 1.957z" fill="#FFF"/>
            <path d="M32.8 35.774c-1.391.87-3.043 1.391-4.782 1.391-4.522 0-8.217-3.696-8.217-8.217s3.695-8.217 8.217-8.217c1.74 0 3.391.522 4.782 1.391v4.348h-4.782v3.391h4.782v7.304z" fill="#FF9900"/>
          </svg>
        </div>
      );
    case 'DHL':
      return (
        <div className={`${iconStyle} bg-[#FFCC00] p-1`}>
          <DhlIcon className={svgSize} />
        </div>
      );
    case 'Royal Mail':
       return (
        <div className={`${iconStyle} bg-[#DE002B]`}>
          <svg className={svgSize} fill="white" viewBox="0 0 512 512">
            <path d="M380.4 171.6c-3-3.4-7.2-5.1-12.4-5.1H144c-5.2 0-9.4 1.7-12.4 5.1-3 3.4-4.6 7.7-4.6 13.1v142.5c0 5.4 1.5 9.7 4.6 13.1 3 3.4 7.2 5.1 12.4 5.1h224c5.2 0 9.4-1.7 12.4-5.1 3-3.4 4.6-7.7 4.6-13.1V184.7c0-5.4-1.5-9.7-4.6-13.1zM256 315.8l-105.4-72.1h210.8L256 315.8z" />
          </svg>
        </div>
      );
    default:
      return <div className={`${iconStyle} bg-gray-300 dark:bg-gray-600`}><Package className={large ? "w-10 h-10 text-gray-600 dark:text-gray-300" : "w-6 h-6 text-gray-600 dark:text-gray-300"} /></div>;
  }
};

// --- Status Badge Component ---
const StatusBadge = ({ status, t }) => {
  switch (status) {
    case 'Out for Delivery':
      return <span className="flex items-center text-sm font-medium text-green-700 dark:text-green-400"><Truck className="w-4 h-4 mr-1.5" /> {t('statusOutForDelivery')}</span>;
    case 'Delivered':
      return <span className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400"><CheckCircle className="w-4 h-4 mr-1.5" /> {t('delivered')}</span>;
    case 'Problem':
      return <span className="flex items-center text-sm font-medium text-red-600 dark:text-red-400"><AlertTriangle className="w-4 h-4 mr-1.5" /> {t('statusProblem')}</span>;
    default: // In Transit
      return <span className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400"><Mail className="w-4 h-4 mr-1.5" /> {t('statusInTransit')}</span>;
  }
};

// --- Helper Functions for Simulation ---
const carriers = ['UPS', 'FedEx', 'USPS', 'Amazon', 'DHL', 'Royal Mail'];
const statuses = ['In Transit', 'Out for Delivery', 'Problem']; // Kept for randomStatus

const detectCarrier = (trackingNumber) => {
  if (trackingNumber.toUpperCase().startsWith('1Z')) return 'UPS';
  if (trackingNumber.match(/^9[234]/) && (trackingNumber.length === 22 || trackingNumber.length === 26)) return 'USPS';
  if (trackingNumber.match(/^[0-9]{12}$/) || trackingNumber.match(/^[0-9]{15}$/)) return 'FedEx';
  if (trackingNumber.toUpperCase().startsWith('TBA')) return 'Amazon';
  if (trackingNumber.match(/^[0-9]{10}$/)) return 'DHL';
  return 'Unknown';
};

const randomStatus = () => {
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const randomDate = () => {
  const today = new Date();
  const daysToAdd = Math.floor(Math.random() * 5) + 1;
  today.setDate(today.getDate() + daysToAdd);
  return today.toISOString().split('T')[0]; // Return YYYY-MM-DD
};

const formatDate = (isoString, language) => {
  if (!isoString) return "Date TBD";
  // Ensure the string is treated as a full ISO string if it's just a date
  const date = new Date(isoString.includes('T') ? isoString : `${isoString}T00:00:00`);
  return date.toLocaleString(language, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

// --- Language Selector Component ---
const LanguageSelector = ({ language, setLanguage, t }) => (
  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
    <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {t('language')}
    </label>
    <select
      id="language-select"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <option value="en">English (US)</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  </div>
);

// --- Sidebar Component ---
const Sidebar = ({ isOpen, onClose, activePage, setActivePage, language, setLanguage, t }) => {
  const sidebarRef = useRef(null);
  useOnClickOutside(sidebarRef, onClose);

  const menuItems = [
    { id: 'Dashboard', icon: Rss, text: t('dashboard') },
    { id: 'About', icon: Info, text: t('about') },
    { id: 'FAQ', icon: HelpCircle, text: t('faq') },
    { id: 'Couriers', icon: Users, text: t('couriers') },
    { id: 'Privacy', icon: Shield, text: t('privacy') },
  ];
  
  const handleItemClick = (id) => {
    setActivePage(id);
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <nav 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t('menu')}</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <ul className="py-4 flex-1 overflow-y-auto">
          {menuItems.map(item => (
            <li key={item.id}>
              <button 
                onClick={() => handleItemClick(item.id)}
                className={`flex items-center gap-4 px-6 py-3 w-full text-left transition-colors ${activePage === item.id ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
        
        <LanguageSelector language={language} setLanguage={setLanguage} t={t} />
      </nav>
    </>
  );
};


// --- AppHeader Component ---
const AppHeader = ({ onMenuClick, t }) => (
  <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-30 transition-colors duration-300">
    <div className="max-w-4xl mx-auto py-5 px-4 sm:px-6 lg:px-8 flex items-center gap-3">
      <button 
        onClick={onMenuClick} 
        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>
      <div className="bg-blue-600 p-2 rounded-lg shrink-0">
        <Package className="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('appTitle')}</h1>
        <p className="text-gray-500 dark:text-gray-400">{t('appSubtitle')}</p>
      </div>
    </div>
  </header>
);

// --- Package Input Form Component (User-facing) ---
const PackageInputForm = ({ onAddPackage, t }) => {
  const [trackingInput, setTrackingInput] = useState("");
  const [packageName, setPackageName] = useState("");
  const [pendingPackage, setPendingPackage] = useState(null);
  const [error, setError] = useState(null);
  
  const nameInputRef = React.useRef(null);

  const handleTrackClick = (e) => {
    e.preventDefault();
    if (!trackingInput.trim()) {
      setError(t('errorTracking'));
      return;
    }
    setError(null);
    
    // --- NEW LOGIC: Check virtual DB first ---
    const virtualDb = JSON.parse(localStorage.getItem('trackit-virtual-packages') || '[]');
    const virtualPackage = virtualDb.find(p => p.trackingNumber.toLowerCase() === trackingInput.toLowerCase());
    
    let detectedPackage;

    if (virtualPackage) {
      // Found in virtual DB
      detectedPackage = { ...virtualPackage }; // Copy all data, including history
      setPackageName(virtualPackage.name); // Pre-fill the name input
    } else {
      // Original simulation logic
      const carrier = detectCarrier(trackingInput);
      if (carrier === 'Unknown') {
          setError(t('errorRecognize'));
          return;
      }
      detectedPackage = {
        trackingNumber: trackingInput,
        carrier: carrier,
        status: randomStatus(),
        estimatedDelivery: randomDate(),
        history: [] // No custom history for simulated packages
      };
      setPackageName(""); // Clear name input for simulation
    }
    
    setPendingPackage(detectedPackage);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleAddToList = (e) => {
    e.preventDefault();
    if (!packageName.trim()) {
      setError(t('errorName'));
      return;
    }
    
    const newPackage = {
      ...pendingPackage,
      id: crypto.randomUUID(),
      name: packageName,
      priority: false,
      isArchived: false,
      history: pendingPackage.history || [] // Ensure history array is passed
    };
    
    onAddPackage(newPackage);
    
    setTrackingInput("");
    setPackageName("");
    setPendingPackage(null);
    setError(null);
  };
  
  const handleCancel = () => {
      setPendingPackage(null);
      setPackageName("");
      setError(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md max-w-4xl mx-auto my-6 transition-colors duration-300">
      <form onSubmit={pendingPackage ? handleAddToList : handleTrackClick}>
        {!pendingPackage ? (
          <>
            <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('addPackage')}
            </label>
            <div className="mt-1 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                id="tracking"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder={t('trackPlaceholder')}
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
              >
                {t('track')}
              </button>
            </div>
          </>
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <CarrierIcon carrier={pendingPackage.carrier} />
              <div>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{pendingPackage.carrier} {t('carrierDetected')}</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">{pendingPackage.trackingNumber}</p>
              </div>
            </div>
            
            <label htmlFor="packageName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('namePackage')}
            </label>
            <div className="mt-1 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                id="packageName"
                ref={nameInputRef}
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder={t('namePlaceholder')}
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150"
              >
                {t('addToList')}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition duration-150"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        )}
        {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

// --- Package Item Component ---
const PackageItem = ({ 
  pkg, 
  handleToggleDelivered, 
  handleRemovePackage,
  handleEditPackageName,
  handleTogglePriority,
  handleToggleArchive,
  handleViewDetails, // Updated prop
  t,
  language
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(pkg.name);
  
  const menuRef = useRef(null);
  useOnClickOutside(menuRef, () => setIsMenuOpen(false));
  
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editedName.trim()) {
      handleEditPackageName(pkg.id, editedName.trim());
      setIsEditing(false);
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(pkg.name);
  };
  
  const handleMenuAction = (action) => {
    action();
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md flex flex-col gap-4 animate-fade-in transition-colors duration-300">
      
      {isEditing ? (
        <form onSubmit={handleSaveEdit} className="space-y-3">
          <label htmlFor={`edit-${pkg.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('editPackageName')}
          </label>
          <input
            type="text"
            id={`edit-${pkg.id}`}
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
            >
              {t('save')}
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition"
            >
              {t('cancel')}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-start gap-4">
            <button 
              onClick={() => handleViewDetails(pkg.id)} // UPDATED
              className="flex items-start gap-4 flex-1 overflow-hidden text-left p-1 -m-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <CarrierIcon carrier={pkg.carrier} />
              <div className="flex-1 overflow-hidden">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 truncate">
                  {pkg.priority && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 shrink-0" />}
                  <span className="truncate">{pkg.name}</span>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{pkg.trackingNumber}</p>
                
                <div className="mt-3 space-y-2">
                  <p className="text-lg font-medium text-blue-700 dark:text-blue-400">
                    {formatDate(pkg.estimatedDelivery, language)}
                  </p>
                  <StatusBadge status={pkg.status} t={t} />
                </div>
              </div>
            </button>
            
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Package options"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-10 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg border dark:border-gray-600 z-20 animate-fade-in-fast">
                  <button
                    onClick={() => handleMenuAction(() => handleTogglePriority(pkg.id))}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <Star className="w-4 h-4" />
                    {pkg.priority ? t('unprioritize') : t('prioritize')}
                  </button>
                  <button
                    onClick={() => handleMenuAction(() => setIsEditing(true))}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <Edit3 className="w-4 h-4" />
                    {t('editName')}
                  </button>
                  <button
                    onClick={() => handleMenuAction(() => handleToggleArchive(pkg.id))}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <Archive className="w-4 h-4" />
                    {pkg.isArchived ? t('unarchive') : t('archive')}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            {pkg.status !== 'Delivered' ? (
              <button
                onClick={() => handleToggleDelivered(pkg.id)}
                className="w-full flex-1 sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition"
              >
                <CheckCircle className="w-4 h-4" />
                {t('markDelivered')}
              </button>
            ) : (
              <button
                onClick={() => handleToggleDelivered(pkg.id)}
                className="w-full flex-1 sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition"
              >
                <History className="w-4 h-4" />
                {t('moveToUpcoming')}
              </button>
            )}
            <button
                onClick={() => handleRemovePackage(pkg.id)}
                className="w-full flex-1 sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-sm font-medium rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition"
              >
                <Trash2 className="w-4 h-4" />
                {t('remove')}
              </button>
          </div>
        </>
      )}
    </div>
  );
};

// --- Dark Mode Toggle Component ---
const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-4 left-4 z-40 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Sun className="w-6 h-6 text-yellow-500" />
      ) : (
        <Moon className="w-6 h-6 text-blue-700" />
      )}
    </button>
  );
};

// --- Generic Modal Component ---
const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) => { // Added maxWidth prop
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-fast"
      onClick={onClose}
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col`}
        onClick={e => e.stopPropagation()} // Prevent closing on modal click
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 rounded-t-2xl z-10">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Page Components (Static) ---
const PageContent = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md max-w-4xl mx-auto my-6 animate-fade-in transition-colors duration-300">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
      {children}
    </div>
  </div>
);

const AboutPage = () => (
  <PageContent title="About TrackIt">
    <p>TrackIt was born from a simple frustration: "Where is my stuff?"</p>
    <p>Our founder, like many people, was ordering multiple items from different stores, all shipping with different carriers. The result? A digital mess of browser tabs, email confirmations, and carrier apps just to answer one question: "What's arriving today?"</p>
    <p>Why couldn't there be one simple, clean place to see everything? No accounts, no sign-ups, no invasive permissions. Just a single dashboard for your packages.</p>
    <p>This app is the first step toward that vision. It's built to do one job and do it well: unify your tracking. It's 100% private, storing your list only on your device in your browser's local storage. No servers, no data collection, no accounts.</p>
    <p>We hope it makes your life just a little bit simpler.</p>
  </PageContent>
);

const FAQPage = () => (
  <PageContent title="Frequently Asked Questions">
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-xl">Is this app free to use?</h3>
        <p>Yes, this app is completely free to use.</p>
      </div>
      <div>
        <h3 className="font-semibold text-xl">Is my data safe and private?</h3>
        <p>Yes. 100%. All package information you enter is stored *only* in your browser's "local storage." It never leaves your device, and we do not have any servers to store or view your data. If you clear your browser cache, your list will be gone.</p>
      </div>
      <div>
        <h3 className="font-semibold text-xl">How do I save my list?</h3>
        <p>Your list is saved automatically to your browser. As long as you use the same browser and don't clear your cache, your list will be here when you return.</p>
      </div>
    </div>
  </PageContent>
);

const PrivacyPage = () => (
  <PageContent title="Privacy Policy">
    <p><strong>Last Updated:</strong> October 27, 2025</p>
    <p>We take your privacy seriously. Our privacy policy is extremely simple:</p>
    <h3 className="font-semibold text-xl mt-4">1. No Data Collection</h3>
    <p>We do not collect, store, track, or transmit any personal information. We do not use cookies for tracking. We do not have user accounts. We do not have a database.</p>
    <h3 className="font-semibold text-xl mt-4">2. Local Storage Only</h3>
    <p>Any tracking numbers or package names you enter are stored *exclusively* on your own device using your browser's "Local Storage" feature. This data is not accessible by us or any third party. It stays on your computer.</p>
    <h3 className="font-semibold text-xl mt-4">3. Data Deletion</h3>
    <p>You can delete your data at any time by removing packages from the list or by clearing your browser's cache and site data for this page.</p>
  </PageContent>
);

const CouriersPage = () => {
  const [expandedCourier, setExpandedCourier] = useState(null); 

  const couriersData = [
    { 
      name: 'UPS', 
      id: 'UPS', 
      description: 'United Parcel Service (UPS) is one of the world\'s largest package delivery companies, headquartered in the United States. It is known for its distinctive brown trucks and global logistics services.' 
    },
    { 
      name: 'FedEx', 
      id: 'FedEx', 
      description: 'FedEx Corporation is an American multinational courier delivery services company. It is known for its pioneering overnight shipping service and real-time package tracking.' 
    },
    { 
      name: 'USPS', 
      id: 'USPS', 
      description: 'The United States Postal Service (USPS) is an independent agency of the U.S. federal government responsible for providing postal service in the United States, including its insular areas and associated states.' 
    },
    { 
      name: 'Amazon Logistics', 
      id: 'Amazon', 
      description: 'Amazon Logistics is Amazon\'s in-house delivery service. It uses a network of independent contractors (Amazon Flex) and delivery partners to handle "last-mile" delivery of packages.' 
    },
    { 
      name: 'DHL Express', 
      id: 'DHL', 
      description: 'DHL is a division of the German logistics company Deutsche Post DHL. It provides international courier, parcel, and express mail services, and is a market leader in global sea and air mail.' 
    },
    { 
      name: 'Royal Mail', 
      id: 'Royal Mail', 
      description: 'Royal Mail is the primary postal service of the United Kingdom. Established in 1516, it provides mail collection and delivery services throughout the UK.' 
    },
    { 
      name: 'Canada Post', 
      id: 'Unknown', 
      description: 'Canada Post is the primary postal operator in Canada. It is a Crown corporation that functions as the country\'s main mail delivery service.' 
    },
    { 
      name: 'Australia Post', 
      id: 'Unknown', 
      description: 'Australia Post is the government-owned corporation that provides postal services in Australia. It offers letter and parcel delivery, as well as retail and financial services.' 
    },
    { 
      name: 'DPD', 
      id: 'Unknown', 
      description: 'DPD (Dynamic Parcel Distribution) is an international parcel delivery service mainly active in Europe. It is owned by La Poste, the French postal service.' 
    },
    { 
      name: 'GLS', 
      id: 'Unknown', 
      description: 'General Logistics Systems B.V. (GLS) is a Dutch-based logistics company. It provides parcel and express services across Europe and North America.' 
    },
    { 
      name: 'Hermes / Evri', 
      id: 'Unknown', 
      description: 'Evri (formerly Hermes) is one of the UK\'s largest consumer delivery specialists, handling parcels for many top online retailers. It focuses on affordable and flexible delivery options.' 
    },
    { 
      name: 'Purolator', 
      id: 'Unknown', 
      description: 'Purolator is a Canadian courier company majority-owned by Canada Post. It specializes in freight, package, and logistics services within Canada and to international destinations.' 
    },
  ];
  
  const handleToggle = (name) => {
    setExpandedCourier(prev => (prev === name ? null : name));
  };

  return (
    <PageContent title="Supported Couriers">
      <p className="mb-6">This app simulates tracking from the following major carriers. Click on a carrier to learn more about them.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {couriersData.map(c => {
          const isExpanded = expandedCourier === c.name;
          return (
            <div 
              key={c.name} 
              className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm transition-all duration-300 overflow-hidden"
            >
              <button 
                onClick={() => handleToggle(c.name)}
                className="flex w-full items-center gap-3 p-4 text-left"
                aria-expanded={isExpanded}
                aria-controls={`desc-${c.id}`}
              >
                <CarrierIcon carrier={c.id} large={true} />
                <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">{c.name}</span>
              </button>
              
              <div 
                id={`desc-${c.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{c.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageContent>
  );
};


// --- NEW: Package Detail Page Component ---
const PackageDetailPage = ({ pkg, onBack, t, language }) => {
  // Function to generate *fallback* simulated history
  const getSimulatedHistory = (status, pkgDate) => {
    const baseDate = new Date(pkgDate);
    
    // Helper to format date
    const d = (daysOffset, hour, minute) => {
      let newDate = new Date(baseDate);
      newDate.setDate(newDate.getDate() - daysOffset);
      newDate.setHours(hour, minute);
      return newDate.toISOString(); // Use ISO string
    };

    const history = [
      { date: d(3, 10, 30), status: 'Label Created', location: 'Origin Facility' },
      { date: d(2, 8, 15), status: 'Package departed sorting facility', location: 'Origin City, XX' }
    ];
    
    if (status === 'In Transit' || status === 'Out for Delivery' || status === 'Problem' || status === 'Delivered') {
      history.push({ date: d(1, 14, 20), status: 'Arrived at Regional Hub', location: 'Destination City, YY' });
    }
    if (status === 'Out for Delivery' || status === 'Delivered') {
      history.push({ date: d(0, 7, 0), status: 'Out for Delivery', location: 'Local Post Office' });
    }
    if (status === 'Problem') {
      history.push({ date: d(0, 9, 15), status: 'Delivery exception - address not found', location: 'Destination City, YY' });
    }
    if (status === 'Delivered') {
      history.push({ date: d(0, 13, 45), status: 'Delivered', location: 'Front Door' });
    }
    return history; // Will be sorted by display logic
  };

  // NEW: Use custom history if it exists, otherwise use fallback
  let history = [];
  if (pkg.history && pkg.history.length > 0) {
    history = [...pkg.history]; // Use the custom history
  } else {
    history = getSimulatedHistory(pkg.status, pkg.estimatedDelivery); // Use old simulation
  }
  
  // Sort to show newest first
  history.sort((a,b) => new Date(b.date) - new Date(a.date));

  // Helper to format date string for display
  const displayDate = (dateString) => {
    if (!dateString) return "Invalid Date";
    return new Date(dateString).toLocaleString(language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md max-w-4xl mx-auto my-6 animate-fade-in transition-colors duration-300">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mb-6 p-1 -ml-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
        <ArrowLeft className="w-5 h-5" />
        {t('backToDash')}
      </button>

      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
        <CarrierIcon carrier={pkg.carrier} large={true} />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{pkg.name}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{pkg.carrier}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 font-mono mt-1">{pkg.trackingNumber}</p>
        </div>
      </div>

      {/* Status & Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{t('currentStatus')}</h3>
          <StatusBadge status={pkg.status} t={t} />
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{t('estDelivery')}</h3>
          <p className="text-lg font-medium text-blue-700 dark:text-blue-400">
            {formatDate(pkg.estimatedDelivery, language)}
          </p>
        </div>
      </div>

      {/* History */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('trackingHistory')}</h3>
        <div className="border-l-2 border-gray-200 dark:border-gray-600 pl-6 space-y-6">
          {history.map((item, index) => (
            <div key={index} className="relative">
              <div className={`absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800 ${index === 0 ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-500'}`}></div>
              <p className={`font-semibold ${index === 0 ? 'text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>{item.status}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.location}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{displayDate(item.date)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// --- Dashboard Content Component ---
const DashboardContent = ({ packages, handlers, t, language }) => {
  
  const activePackages = packages.filter(p => !p.isArchived);
  const archivedPackages = packages.filter(p => p.isArchived);

  const upcomingPackages = activePackages
    .filter(p => p.status !== 'Delivered')
    .sort((a, b) => {
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;
      return new Date(a.estimatedDelivery) - new Date(b.estimatedDelivery);
    });
    
  const deliveredPackages = activePackages
    .filter(p => p.status === 'Delivered')
    .sort((a, b) => new Date(b.estimatedDelivery) - new Date(a.estimatedDelivery));
  
  return (
    <>
      <PackageInputForm onAddPackage={handlers.handleAddPackage} t={t} />
      
      <section className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{t('upcoming')}</h2>
          {/* Removed Gemini Organize Button */}
        </div>
        
        {upcomingPackages.length > 0 ? (
          <div className="space-y-4">
            {upcomingPackages.map(pkg => (
              <PackageItem key={pkg.id} pkg={pkg} {...handlers} t={t} language={language} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-10 rounded-lg shadow-sm">
            <Package className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500" />
            <p className="mt-2">{t('noUpcoming')}</p>
            <p className="text-sm">{t('noUpcomingSub')}</p>
          </div>
        )}
      </section>
      
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{t('delivered')}</h2>
        {deliveredPackages.length > 0 ? (
          <div className="space-y-4">
            {deliveredPackages.map(pkg => (
              <PackageItem key={pkg.id} pkg={pkg} {...handlers} t={t} language={language} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-10 rounded-lg shadow-sm">
            <CheckCircle className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500" />
            <p className="mt-2">{t('noDelivered')}</p>
          </div>
        )}
      </section>
      
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{t('archived')}</h2>
        {archivedPackages.length > 0 ? (
          <div className="space-y-4">
            {archivedPackages.map(pkg => (
              <PackageItem key={pkg.id} pkg={pkg} {...handlers} t={t} language={language} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-10 rounded-lg shadow-sm">
            <Archive className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500" />
            <p className="mt-2">{t('noArchived')}</p>
          </div>
        )}
      </section>
    </>
  );
};

// --- Admin Components ---

const AdminLoginPage = ({ onLogin, error, t }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-3 rounded-lg">
            <UserCheck className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">{t('adminLogin')}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
          >
            {t('login')}
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onLogout, t, isDarkMode }) => {
  const [virtualPackages, setVirtualPackages] = useState(() => {
    return JSON.parse(localStorage.getItem('trackit-virtual-packages') || '[]');
  });
  
  const [totalTracked, setTotalTracked] = useState(() => {
     return JSON.parse(localStorage.getItem('trackit-packages') || '[]').length;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    trackingNumber: "",
    name: "",
    carrier: "",
    estimatedDelivery: "",
    history: [{ date: '', status: '', location: '' }] // Start with one history item
  });

  // Effect to update totalTracked in real-time
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'trackit-packages') {
        setTotalTracked(JSON.parse(e.newValue || '[]').length);
      }
      if (e.key === 'trackit-virtual-packages') {
        setVirtualPackages(JSON.parse(e.newValue || '[]'));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Effect to save virtual packages when they change
  useEffect(() => {
    localStorage.setItem('trackit-virtual-packages', JSON.stringify(virtualPackages));
  }, [virtualPackages]);
  
  // --- NEW History Form Handlers ---
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleHistoryChange = (index, e) => {
    const { name, value } = e.target;
    const newHistory = [...formState.history];
    newHistory[index][name] = value;
    setFormState(prev => ({ ...prev, history: newHistory }));
  };

  const addHistoryEvent = () => {
    setFormState(prev => ({
      ...prev,
      history: [...prev.history, { date: '', status: '', location: '' }]
    }));
  };

  const removeHistoryEvent = (index) => {
    const newHistory = [...formState.history];
    newHistory.splice(index, 1);
    setFormState(prev => ({ ...prev, history: newHistory }));
  };
  // ---

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Sort history to find the latest event
    const sortedHistory = [...formState.history]
      .filter(h => h.date) // Filter out any empty events
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Get status from the latest event
    const latestStatus = sortedHistory.length > 0 ? sortedHistory[0].status : 'In Transit';

    const newPackage = {
      id: crypto.randomUUID(),
      trackingNumber: formState.trackingNumber,
      name: formState.name,
      carrier: formState.carrier,
      estimatedDelivery: formState.estimatedDelivery,
      status: latestStatus, // Set main status from latest history
      history: sortedHistory // Save the sorted history
    };
    
    setVirtualPackages(prev => [newPackage, ...prev]);
    setIsModalOpen(false);
    // Reset form
    setFormState({
      trackingNumber: "",
      name: "",
      carrier: "",
      estimatedDelivery: "",
      history: [{ date: '', status: '', location: '' }]
    });
  };
  
  const deleteVirtualPackage = (id) => {
    setVirtualPackages(prev => prev.filter(p => p.id !== id));
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">{t('adminDash')}</h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
          >
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </button>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t('totalTracked')}</h2>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-1">{totalTracked}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{t('virtualPackages')}</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              <PlusCircle className="w-5 h-5" />
              {t('createVirtual')}
            </button>
          </div>

          {virtualPackages.length > 0 ? (
            <div className="space-y-3">
              {virtualPackages.map(pkg => (
                <div key={pkg.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CarrierIcon carrier={pkg.carrier} />
                    <div>
                      <p className="font-semibold text-lg">{pkg.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{pkg.trackingNumber} &bull; {pkg.carrier}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('status')}: {pkg.status} &bull; {t('estDelivery')}: {formatDate(pkg.estimatedDelivery, "en")}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteVirtualPackage(pkg.id)}
                    className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition"
                    aria-label="Delete virtual package"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">{t('noVirtual')}</p>
          )}
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('createVirtual')} maxWidth="max-w-3xl">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('trackingCode')}</label>
              <input type="text" name="trackingNumber" id="trackingNumber" value={formState.trackingNumber} onChange={handleFormChange} required
                     className="mt-1 w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('packageName')}</label>
              <input type="text" name="name" id="name" value={formState.name} onChange={handleFormChange} required
                     className="mt-1 w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label htmlFor="carrier" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('carrier')}</label>
              <select name="carrier" id="carrier" value={formState.carrier} onChange={handleFormChange} required
                      className="mt-1 w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600">
                <option value="">{t('selectCarrier')}</option>
                {carriers.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="estimatedDelivery" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('estDelivery')}</label>
              <input type="date" name="estimatedDelivery" id="estimatedDelivery" value={formState.estimatedDelivery} onChange={handleFormChange} required
                     className="mt-1 w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600" />
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('trackingHistory')}</h3>
            <div className="space-y-4">
              {formState.history.map((event, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <label htmlFor={`history-date-${index}`} className="block text-xs font-medium text-gray-600 dark:text-gray-400">{t('dateAndTime')}</label>
                    <input 
                      type="datetime-local" 
                      name="date"
                      id={`history-date-${index}`}
                      value={event.date}
                      onChange={(e) => handleHistoryChange(index, e)}
                      required
                      className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor={`history-status-${index}`} className="block text-xs font-medium text-gray-600 dark:text-gray-400">{t('eventStatus')}</label>
                    <input 
                      type="text" 
                      name="status"
                      id={`history-status-${index}`}
                      value={event.status}
                      onChange={(e) => handleHistoryChange(index, e)}
                      required
                      className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-grow">
                      <label htmlFor={`history-location-${index}`} className="block text-xs font-medium text-gray-600 dark:text-gray-400">{t('eventLocation')}</label>
                      <input 
                        type="text" 
                        name="location"
                        id={`history-location-${index}`}
                        value={event.location}
                        onChange={(e) => handleHistoryChange(index, e)}
                        required
                        className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500"
                      />
                    </div>
                    {formState.history.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeHistoryEvent(index)}
                        title={t('removeEvent')}
                        className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition"
                      >
                        <MinusCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addHistoryEvent}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
            >
              <PlusCircle className="w-4 h-4" />
              {t('addHistoryEvent')}
            </button>
          </div>
          
          <div className="pt-6 flex justify-end border-t border-gray-200 dark:border-gray-600">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              {t('create')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


// --- Main App Component ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState('Dashboard');
  const [selectedPackageId, setSelectedPackageId] = useState(null); // To track detail view
  
  const [packages, setPackages] = useState(() => {
    try {
      const savedPackages = localStorage.getItem('trackit-packages');
      return savedPackages ? JSON.parse(savedPackages) : [];
    } catch (e) {
      console.error("Could not parse packages from localStorage", e);
      return [];
    }
  });
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedMode = localStorage.getItem('trackit-dark-mode');
      if (savedMode) { return JSON.parse(savedMode); }
      const currentHour = new Date().getHours();
      return currentHour >= 19 || currentHour < 7; // 7 PM to 7 AM
    } catch (e) {
      console.error("Could not parse dark mode from localStorage", e);
      return false;
    }
  });
  
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('trackit-language') || 'en';
  });
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // --- NEW: Routing and Admin State ---
  const [route, setRoute] = useState(window.location.hash);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState(null);
  
  const t = useTranslation(language); // Translation function

  // --- Effects ---
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('trackit-packages', JSON.stringify(packages));
    } catch (e) { console.error("Could not save packages", e); }
  }, [packages]);
  
  useEffect(() => {
    try {
      localStorage.setItem('trackit-dark-mode', JSON.stringify(isDarkMode));
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) { console.error("Could not save dark mode", e); }
  }, [isDarkMode]);
  
  useEffect(() => {
    try {
      localStorage.setItem('trackit-language', language);
      document.documentElement.lang = language;
    } catch (e) { console.error("Could not save language", e); }
  }, [language]);
  
  // --- NEW: Hash Routing Effect ---
  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash;
      setRoute(newHash);
      if (!newHash.startsWith('#admin')) {
        // Log out admin if they navigate away
        setIsAdmin(false);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // --- NEW: Reset detail view if sidebar page changes ---
  useEffect(() => {
    setSelectedPackageId(null);
  }, [activePage]);

  // --- Event Handlers ---
  const packageHandlers = {
    handleAddPackage: (newPackage) => {
      setPackages(prev => [newPackage, ...prev]);
    },
    handleToggleDelivered: (id) => {
      setPackages(prev => prev.map(p => 
        p.id === id ? { ...p, status: p.status === 'Delivered' ? randomStatus() : 'Delivered' } : p
      ));
    },
    handleRemovePackage: (id) => {
      setPackages(prev => prev.filter(p => p.id !== id));
    },
    handleEditPackageName: (id, newName) => {
      setPackages(prev => prev.map(p => (p.id === id ? { ...p, name: newName } : p)));
    },
    handleTogglePriority: (id) => {
      setPackages(prev => prev.map(p => (p.id === id ? { ...p, priority: !p.priority } : p)));
    },
    handleToggleArchive: (id) => {
      setPackages(prev => prev.map(p => (p.id === id ? { ...p, isArchived: !p.isArchived } : p)));
    },
    handleViewDetails: (id) => { // NEW
      setSelectedPackageId(id);
    },
  };
  
  // --- NEW: Admin Handlers ---
  const handleAdminLogin = (password) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      setAdminLoginError(null);
      window.location.hash = '#admin/dashboard';
    } else {
      setAdminLoginError(t('wrongPass'));
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    window.location.hash = '';
  };

  // --- Page Renderer ---
  const renderPage = () => {
    // NEW: Check for detail page view first
    if (activePage === 'Dashboard' && selectedPackageId) {
      const pkg = packages.find(p => p.id === selectedPackageId);
      if (pkg) {
        return <PackageDetailPage 
          pkg={pkg} 
          onBack={() => setSelectedPackageId(null)} 
          t={t} 
          language={language} 
        />;
      } else {
        // Package not found, reset view
        setSelectedPackageId(null);
      }
    }
    
    // Standard page rendering
    switch (activePage) {
      case 'Dashboard':
        return <DashboardContent packages={packages} handlers={packageHandlers} t={t} language={language} />;
      case 'About':
        return <AboutPage />;
      case 'FAQ':
        return <FAQPage />;
      case 'Privacy':
        return <PrivacyPage />;
      case 'Couriers':
        return <CouriersPage />;
      default:
        return <DashboardContent packages={packages} handlers={packageHandlers} t={t} language={language} />;
    }
  };
  
  if (isLoading) {
    return <LoadingScreen t={t} />;
  }
  
  // --- NEW: Top-level Render Logic ---
  if (route.startsWith('#admin')) {
    if (!isAdmin && route === '#admin/dashboard') {
      // If trying to access dashboard directly, force login
      window.location.hash = '#admin';
      return <AdminLoginPage onLogin={handleAdminLogin} error={adminLoginError} t={t} />;
    }
    if (!isAdmin) {
      return <AdminLoginPage onLogin={handleAdminLogin} error={adminLoginError} t={t} />;
    }
    return <AdminDashboard onLogout={handleAdminLogout} t={t} isDarkMode={isDarkMode} />;
  }
  
  // --- Original App Render ---
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-inter transition-colors duration-300 text-gray-900 dark:text-gray-100">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        activePage={activePage}
        setActivePage={setActivePage}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      <AppHeader onMenuClick={() => setIsSidebarOpen(true)} t={t} />
      
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderPage()}
      </main>
      
      {/* Removed GeminiOrganizeModal */}
      
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; 2025 TrackIt. All your data is local.</p>
      </footer>
      
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      
      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-fade-in-fast { animation: fadeIn 0.15s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .prose p { margin-bottom: 1.25em; }
        .prose h3 { margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 600; }
        .dark .prose-invert { color: #d1d5db; }
      `}</style>
    </div>
  );
}

