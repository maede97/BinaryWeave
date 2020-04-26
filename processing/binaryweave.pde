/*
  (c) Matthias Busenhart, Sonja Hüppi; 04/2020
 */

final int SIZE = 15;
final int RAPPORT = 20;
final int ANZAHL_ASCII_ZEICHEN = 8;
final boolean SHOW_CHAR = true; // false

// don't change below this part
String TEXT = "";
PFont f;

void settings() {
  String[] lines = loadStrings("input.txt");
  for (int i = 0; i < lines.length; i++) {
    TEXT += lines[i] + "\n";
  }
  if (SHOW_CHAR) {
    size(RAPPORT * SIZE * ANZAHL_ASCII_ZEICHEN + SIZE, (TEXT.length()-1) * SIZE);
  } else {
    size(RAPPORT * SIZE * ANZAHL_ASCII_ZEICHEN, (TEXT.length()-1) * SIZE);
  }
}

void setup() {
  background(255);
  f = createFont("Arial", SIZE, true);
  textFont(f);

  for (int currentChar = 0; currentChar < TEXT.length(); currentChar++) {
    if (SHOW_CHAR) {
      fill(0);
      text(TEXT.charAt(currentChar), 0, currentChar * SIZE + SIZE);
    }
    String code = binary(TEXT.charAt(currentChar), ANZAHL_ASCII_ZEICHEN);
    for (int bit = 0; bit < ANZAHL_ASCII_ZEICHEN; bit++) {
      if (code.charAt(bit) == '1') {
        fill(0);
        stroke(0);
      } else {
        fill(255);
        stroke(255);
      }
      for (int aktuellerRapport = 0; aktuellerRapport < RAPPORT; aktuellerRapport++) {
        if (SHOW_CHAR) {
          rect(bit * SIZE + aktuellerRapport * ANZAHL_ASCII_ZEICHEN * SIZE + SIZE, currentChar * SIZE, SIZE, SIZE);
        } else {
          rect(bit * SIZE + aktuellerRapport * ANZAHL_ASCII_ZEICHEN * SIZE, currentChar * SIZE, SIZE, SIZE);
        }
      }
    }
  }
  
  save(new java.text.SimpleDateFormat("yyyy-MM-dd HH-mm-ss").format(new java.util.Date()) + ".png");
}
