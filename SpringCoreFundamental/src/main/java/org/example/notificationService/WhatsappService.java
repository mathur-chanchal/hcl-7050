package org.example.notificationService;

public class WhatsappService implements NotificationService{
    @Override
    public void sendMsg(String msg) {
        System.out.print("WhatsApp Service:" + msg);
    }
}
