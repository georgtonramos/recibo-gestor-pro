import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Building, Users, ArrowDown, ArrowUp, FileArchive, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    {
      title: "Total de Recibos",
      value: "142",
      icon: FileText,
      change: "+12%",
      changeType: "increase",
    },
    {
      title: "Recibos este Mês",
      value: "28",
      icon: FileText,
      change: "+8%",
      changeType: "increase",
    },
    {
      title: "Empresas",
      value: "5",
      icon: Building,
      change: "+1",
      changeType: "increase",
    },
    {
      title: "Funcionários",
      value: "32",
      icon: Users,
      change: "-2",
      changeType: "decrease",
    },
  ];

  const recentReceipts = [
    { id: 1, company: "TechCorp", period: "04/2025", employees: 12, date: "05/05/2025" },
    { id: 2, company: "Mega Sistemas", period: "04/2025", employees: 8, date: "01/05/2025" },
    { id: 3, company: "Construtech", period: "04/2025", employees: 5, date: "28/04/2025" },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard Administrativo</h1>
        <Button 
          onClick={() => navigate('/gerar-recibos')}
          className="bg-receipt-600 hover:bg-receipt-700"
        >
          <FileText className="mr-2 h-4 w-4" /> Gerar Novos Recibos
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    {stat.changeType === "increase" ? (
                      <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={stat.changeType === "increase" ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="bg-receipt-100 p-3 rounded-full">
                  <stat.icon className="h-6 w-6 text-receipt-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recibos Recentes</CardTitle>
            <CardDescription>Lista dos últimos recibos gerados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReceipts.map((receipt) => (
                <div key={receipt.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{receipt.company}</p>
                    <p className="text-sm text-muted-foreground">
                      Período: {receipt.period} • {receipt.employees} funcionários
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-muted-foreground mr-4">{receipt.date}</p>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 w-full" onClick={() => navigate('/historico-recibos')}>
              Ver todos os recibos
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Atalhos para funções comuns</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => navigate('/empresas')}
            >
              <Building className="mr-2 h-4 w-4" />
              Gerenciar Empresas
            </Button>
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => navigate('/funcionarios')}
            >
              <Users className="mr-2 h-4 w-4" />
              Gerenciar Funcionários
            </Button>
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => navigate('/historico-recibos')}
            >
              <FileArchive className="mr-2 h-4 w-4" />
              Histórico de Recibos
            </Button>
            <Button 
              className="bg-receipt-600 hover:bg-receipt-700 justify-start"
              onClick={() => navigate('/gerar-recibos')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Gerar Novos Recibos
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const recentReceipts = [
    { id: 1, type: "Vale Transporte", period: "04/2025", amount: "R$ 220,00", date: "05/05/2025" },
    { id: 2, type: "Vale Alimentação", period: "04/2025", amount: "R$ 550,00", date: "01/05/2025" },
    { id: 3, type: "Vale Transporte", period: "03/2025", amount: "R$ 220,00", date: "05/04/2025" },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Olá, {user?.name}</h1>
          <p className="text-muted-foreground">Bem-vindo ao Gestor de Recibos</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Meus Recibos Recentes</CardTitle>
            <CardDescription>Últimos recibos disponibilizados para você</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReceipts.map((receipt) => (
                <div key={receipt.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{receipt.type}</p>
                    <p className="text-sm text-muted-foreground">
                      Período: {receipt.period} • Valor: {receipt.amount}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-muted-foreground mr-4">{receipt.date}</p>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 w-full" onClick={() => navigate('/meus-recibos')}>
              Ver todos os meus recibos
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Perfil</CardTitle>
            <CardDescription>Seus dados principais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Nome:</div>
                <div>{user?.name}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Email:</div>
                <div>{user?.email}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Cargo:</div>
                <div>Desenvolvedor</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Departamento:</div>
                <div>TI</div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => navigate('/perfil')}
              >
                <User className="mr-2 h-4 w-4" />
                Ver meu perfil completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <AppLayout>
      {user?.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
    </AppLayout>
  );
};

export default Dashboard;
