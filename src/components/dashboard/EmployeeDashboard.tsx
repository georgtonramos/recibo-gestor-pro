
import { FileText, Download, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

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

export default EmployeeDashboard;
