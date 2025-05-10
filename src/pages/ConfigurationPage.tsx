
import { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  Building2,
  Users,
  FileText,
  Settings,
  Bell,
  Save,
  Upload,
  Star
} from "lucide-react";

const ConfigurationPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  // Company form
  const companyForm = useForm({
    defaultValues: {
      companyName: "Tech Solutions Inc.",
      cnpj: "12.345.678/0001-90",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
      phone: "(11) 3456-7890",
      email: "contato@techsolutions.com",
    }
  });

  // System form
  const systemForm = useForm({
    defaultValues: {
      language: "pt-BR",
      dateFormat: "DD/MM/YYYY",
      theme: "light",
      itemsPerPage: "10",
      enableNotifications: true,
      allowMultipleLogins: false,
      automaticLogout: true,
      logoutTimer: "30",
    }
  });

  // Notification form
  const notificationForm = useForm({
    defaultValues: {
      emailNotifications: true,
      receiptGeneration: true,
      employeeCreation: true,
      systemUpdates: false,
    }
  });

  // Receipt form
  const receiptForm = useForm({
    defaultValues: {
      defaultCompany: "1",
      defaultReceiptType: "1",
      logoDisplay: true,
      signatureRequired: true,
      footerText: "Este recibo é válido como comprovante de pagamento",
    }
  });

  const handleSaveCompany = (data: any) => {
    console.log("Company data:", data);
    toast({
      title: "Configurações salvas",
      description: "As informações da empresa foram atualizadas com sucesso.",
    });
  };

  const handleSaveSystem = (data: any) => {
    console.log("System data:", data);
    toast({
      title: "Configurações salvas",
      description: "As configurações do sistema foram atualizadas com sucesso.",
    });
  };

  const handleSaveNotifications = (data: any) => {
    console.log("Notification data:", data);
    toast({
      title: "Configurações salvas",
      description: "As configurações de notificação foram atualizadas com sucesso.",
    });
  };

  const handleSaveReceipt = (data: any) => {
    console.log("Receipt data:", data);
    toast({
      title: "Configurações salvas",
      description: "As configurações de recibos foram atualizadas com sucesso.",
    });
  };

  const handleUploadLogo = () => {
    toast({
      title: "Upload iniciado",
      description: "O upload do logo foi iniciado. Aguarde a conclusão.",
    });
    // Simulate upload success
    setTimeout(() => {
      toast({
        title: "Upload concluído",
        description: "O logo da empresa foi atualizado com sucesso.",
      });
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações do sistema
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>Geral</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="receipts" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Recibos</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span>Notificações</span>
          </TabsTrigger>
        </TabsList>

        {/* Geral Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais do Sistema</CardTitle>
              <CardDescription>
                Configure as preferências básicas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...systemForm}>
                <form onSubmit={systemForm.handleSubmit(handleSaveSystem)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={systemForm.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Idioma</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o idioma" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                              <SelectItem value="en-US">English (United States)</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Idioma da interface do sistema
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={systemForm.control}
                      name="dateFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Formato de Data</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o formato" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Formato de exibição das datas
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={systemForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tema</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tema" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="light">Claro</SelectItem>
                              <SelectItem value="dark">Escuro</SelectItem>
                              <SelectItem value="system">Sistema</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Tema da interface do usuário
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={systemForm.control}
                      name="itemsPerPage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Itens por página</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a quantidade" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="5">5 itens</SelectItem>
                              <SelectItem value="10">10 itens</SelectItem>
                              <SelectItem value="20">20 itens</SelectItem>
                              <SelectItem value="50">50 itens</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Quantidade de itens exibidos por página nas tabelas
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Segurança</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Permitir múltiplos logins</FormLabel>
                        <FormDescription>
                          Permitir que a mesma conta seja usada em vários dispositivos simultaneamente
                        </FormDescription>
                      </div>
                      <Switch checked={systemForm.watch("allowMultipleLogins")} 
                              onCheckedChange={(value) => systemForm.setValue("allowMultipleLogins", value)} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Logout automático por inatividade</FormLabel>
                        <FormDescription>
                          Deslogar o usuário após período de inatividade
                        </FormDescription>
                      </div>
                      <Switch checked={systemForm.watch("automaticLogout")} 
                              onCheckedChange={(value) => systemForm.setValue("automaticLogout", value)} />
                    </div>

                    {systemForm.watch("automaticLogout") && (
                      <FormField
                        control={systemForm.control}
                        name="logoutTimer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tempo de inatividade (minutos)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                              Tempo de inatividade antes do logout automático
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Configurações
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Tab */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>
                Gerenciar informações básicas da empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...companyForm}>
                <form onSubmit={companyForm.handleSubmit(handleSaveCompany)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={companyForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da empresa</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNPJ</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-4">Logo da empresa</h3>
                    <div className="flex items-center gap-4">
                      <div className="border rounded-md p-4 w-32 h-32 flex items-center justify-center bg-gray-50">
                        <img src="/placeholder.svg" alt="Logo" className="max-w-full max-h-full" />
                      </div>
                      <div>
                        <Button type="button" variant="secondary" onClick={handleUploadLogo}>
                          <Upload className="mr-2 h-4 w-4" />
                          Alterar logo
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">
                          Formatos suportados: PNG, JPG ou SVG. Tamanho máximo: 2MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar informações
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Receipts Tab */}
        <TabsContent value="receipts">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Recibos</CardTitle>
              <CardDescription>
                Personalização da geração e exibição de recibos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...receiptForm}>
                <form onSubmit={receiptForm.handleSubmit(handleSaveReceipt)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={receiptForm.control}
                      name="defaultCompany"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empresa padrão</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a empresa padrão" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">TechCorp</SelectItem>
                              <SelectItem value="2">Mega Sistemas</SelectItem>
                              <SelectItem value="3">Construtech</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Empresa pré-selecionada ao gerar novos recibos
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={receiptForm.control}
                      name="defaultReceiptType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de recibo padrão</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo padrão" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">Vale Transporte</SelectItem>
                              <SelectItem value="2">Vale Alimentação</SelectItem>
                              <SelectItem value="3">Adiantamento</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Tipo de recibo pré-selecionado ao gerar novos recibos
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Aparência</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Exibir logo da empresa</Label>
                        <p className="text-sm text-muted-foreground">
                          Incluir o logo da empresa nos recibos gerados
                        </p>
                      </div>
                      <Switch 
                        checked={receiptForm.watch("logoDisplay")} 
                        onCheckedChange={(value) => receiptForm.setValue("logoDisplay", value)} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Assinatura obrigatória</Label>
                        <p className="text-sm text-muted-foreground">
                          Exibir campo para assinatura do funcionário no recibo
                        </p>
                      </div>
                      <Switch 
                        checked={receiptForm.watch("signatureRequired")} 
                        onCheckedChange={(value) => receiptForm.setValue("signatureRequired", value)} 
                      />
                    </div>

                    <FormField
                      control={receiptForm.control}
                      name="footerText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Texto de rodapé</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Texto exibido no rodapé de todos os recibos
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar configurações
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>
                Gerencie como e quando você recebe notificações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(handleSaveNotifications)} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificações por email</Label>
                        <p className="text-sm text-muted-foreground">
                          Enviar notificações por email além das notificações no sistema
                        </p>
                      </div>
                      <Switch 
                        checked={notificationForm.watch("emailNotifications")} 
                        onCheckedChange={(value) => notificationForm.setValue("emailNotifications", value)} 
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Eventos para notificação</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Geração de recibos</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificar quando novos recibos forem gerados
                        </p>
                      </div>
                      <Switch 
                        checked={notificationForm.watch("receiptGeneration")} 
                        onCheckedChange={(value) => notificationForm.setValue("receiptGeneration", value)} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Criação de funcionários</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificar quando novos funcionários forem cadastrados
                        </p>
                      </div>
                      <Switch 
                        checked={notificationForm.watch("employeeCreation")} 
                        onCheckedChange={(value) => notificationForm.setValue("employeeCreation", value)} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Atualizações do sistema</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificar sobre atualizações e novidades no sistema
                        </p>
                      </div>
                      <Switch 
                        checked={notificationForm.watch("systemUpdates")} 
                        onCheckedChange={(value) => notificationForm.setValue("systemUpdates", value)} 
                      />
                    </div>
                  </div>

                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar configurações
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default ConfigurationPage;
