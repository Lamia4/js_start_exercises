# Issues
## 0001 - Manager-Account Passwort vergessen
Wir haben das Passwort für den Manager-Account vergessen, mit dem Events verwaltet werden können. Wie bekommen wir wieder Zugriff auf das System?
--> Done
## 0002 - Ändern und Löschen von Events ungesichert
Die PATCH und DELETE Routen für Events sind auch für nicht angemeldete User erreichbar. Wir müssen sicherstellen, dass nur der Manager-Account Zugriff bekommt.
--> Done
## 0003 - "Fantasiewerte" für Datumsangaben
Beim Erstellen neuer Events lassen sich für das Datum beliebige Strings eingeben. Daher soll geprüft werden, ob ein tatsächliches Datum (YYYY-MM-DD, optional auch Uhrzeit) übergeben wird.
--> // ist date-time bei ajv und type: date im schema dasselbe "Format?
## 0004 - Event-Datum darf nur in Zukunft liegen
Ein neues Event soll nicht in der Vergangenheit angelegt werden. Stattdessen soll eine Fehlermeldung ausgegeben werden.
--> // bisher wird datum in vergangenheit nur von mongoose schema zurückgewiesen, ändern?
# 0005 - Fehlender Nachname ohne Fehlermeldung
Bei der Ticketbestellung wird die Anfrage mit dem Statuscode 400 abgelehnt, falls der Nachname nicht übergeben wird. Allerdings gibt es keine Fehlermeldung. Hier soll eine aussagekräftige Meldung helfen, die Anfrage korrekt zu stellen.
--> Done
## 0006 - Tickets nur anlegen, wenn noch Plätze frei
Die Events sollen nicht überbucht werden. Beim Anlegen soll also erst geprüft werden, ob noch ein Platz frei ist.
--> welchen Status code??(bisher 409 conflict, aber 413 oder 416)

## 0007 - Tickets nur anlegen, wenn Event existiert
Tickets können angelegt werden, auch wenn die eventId nicht in der Datenbank zu finden ist. Wir benötigen eine Überprüfung vor dem Erstellen und eine Fehlermeldung, wenn das Event nicht existiert.
--> status 404? 

## 0008 - Löschen nicht vorhandener Konzerttickets möglich
Beim Löschen von Tickets wird nicht geprüft, ob das Ticket tatsächlich existiert. Wir benötigen den passenden Statuscode, falls das Ticket nicht gefunden werden kann.
--> status 404? 
--> über error handler laufen lassen? Bisher wird direkt was zurück gesendet // dann müsste aber error handling angepasst werden, sendet bisher standardmäßig nur 500er zurück