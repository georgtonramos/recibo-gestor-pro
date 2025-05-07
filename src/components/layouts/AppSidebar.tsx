
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { FileText, Home, Building, Users, FileArchive, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle";

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';
  
  const adminMenuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Empresas",
      url: "/empresas",
      icon: Building,
    },
    {
      title: "Funcionários",
      url: "/funcionarios",
      icon: Users,
    },
    {
      title: "Gerar Recibos",
      url: "/gerar-recibos",
      icon: FileText,
    },
    {
      title: "Histórico de Recibos",
      url: "/historico-recibos",
      icon: FileArchive,
    },
    {
      title: "Configurações",
      url: "/configuracoes",
      icon: Settings,
    },
  ];

  const employeeMenuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Meus Recibos",
      url: "/meus-recibos",
      icon: FileArchive,
    },
    {
      title: "Meu Perfil",
      url: "/perfil",
      icon: User,
    },
  ];

  const menuItems = isAdmin ? adminMenuItems : employeeMenuItems;

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="bg-receipt-500 p-1.5 rounded">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg">APP Recibo</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    className={cn(
                      location.pathname === item.url && "bg-sidebar-accent"
                    )}
                    onClick={() => handleNavigation(item.url)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium">Logado como:</p>
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.role === 'admin' ? 'Administrador' : 'Funcionário'}</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
